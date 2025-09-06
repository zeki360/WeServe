"use client"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { foodItems, type FoodItem } from "@/lib/data"
import FoodCard from "@/components/FoodCard"
import { Search } from "lucide-react"

const categories: FoodItem['category'][] = ['Breakfast', 'Main Dish', 'Drinks', 'Dessert'];

export default function MenuPage() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foodItems
                .filter(item => item.category === category)
                .map(item => <FoodCard key={item.id} item={item} />)
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
