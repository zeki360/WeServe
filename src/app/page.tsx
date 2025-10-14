"use client"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type FoodItem } from "@/lib/data"
import FoodCard from "@/components/FoodCard"
import { Search, Loader } from "lucide-react"
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { FoodOrderDialog } from "@/components/FoodOrderDialog";

const categories: FoodItem['category'][] = ['Breakfast', 'Main Dish', 'Drinks', 'Dessert'];

export default function MenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    const unsubscribe = onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allItems: FoodItem[] = Object.values(data).map((item: any) => {
          const extension = item.imageExtension || 'jpg';
          const imageName = item.menuName.toLowerCase().replace(/\s+/g, '_') + `.${extension}`;
          return {
            id: item.menuId,
            name: item.menuName,
            price: parseFloat(item.menuPrice),
            category: item.menuType === 'MainDish' ? 'Main Dish' : item.menuType,
            image: `/images/${imageName}`,
            rating: 4.5, // Placeholder rating
            dataAiHint: item.menuName.toLowerCase().split(' ').slice(0,2).join(' '),
          };
        });
        
        // Filter out duplicate items by name
        const uniqueItems = allItems.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.name === item.name
          ))
        );
        
        setFoodItems(uniqueItems);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase read failed: " + error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFoodItemClick = (item: FoodItem) => {
    setSelectedItem(item);
  };

  const handleDialogClose = () => {
    setSelectedItem(null);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-16 w-16 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Our Menu
        </h1>
        <p className="text-muted-foreground mt-2">
          Deliciously crafted meals, just for you.
        </p>
      </header>
      
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for dishes..." className="pl-10 w-full" />
      </div>

      <Tabs defaultValue="Breakfast" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">{category}</TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} onClick={() => handleFoodItemClick(item)} className="cursor-pointer">
                    <FoodCard item={item} />
                  </div>
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {selectedItem && (
        <FoodOrderDialog 
          item={selectedItem} 
          open={!!selectedItem} 
          onOpenChange={handleDialogClose} 
        />
      )}
    </div>
  )
}
