export type FoodItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: 'Breakfast' | 'Main Dish' | 'Drinks' | 'Dessert';
  image: string;
  dataAiHint: string;
};

export const foodItems: FoodItem[] = [
  // Breakfast
  { id: 'b1', name: 'Classic Pancakes', price: 8.99, rating: 4.5, category: 'Breakfast', image: 'https://picsum.photos/400/300', dataAiHint: 'pancakes breakfast' },
  { id: 'b2', name: 'Avocado Toast', price: 10.50, rating: 4.8, category: 'Breakfast', image: 'https://picsum.photos/400/301', dataAiHint: 'avocado toast' },
  { id: 'b3', name: 'Scrambled Eggs & Bacon', price: 9.50, rating: 4.2, category: 'Breakfast', image: 'https://picsum.photos/400/302', dataAiHint: 'scrambled eggs' },
  { id: 'b4', name: 'Oatmeal Bowl', price: 6.99, rating: 4.6, category: 'Breakfast', image: 'https://picsum.photos/400/303', dataAiHint: 'oatmeal bowl' },
  
  // Main Dish
  { id: 'm1', name: 'Grilled Salmon', price: 18.99, rating: 4.9, category: 'Main Dish', image: 'https://picsum.photos/400/304', dataAiHint: 'grilled salmon' },
  { id: 'm2', name: 'Spaghetti Carbonara', price: 14.50, rating: 4.7, category: 'Main Dish', image: 'https://picsum.photos/400/305', dataAiHint: 'pasta carbonara' },
  { id: 'm3', name: 'Gourmet Cheeseburger', price: 13.99, rating: 4.4, category: 'Main Dish', image: 'https://picsum.photos/400/306', dataAiHint: 'cheeseburger meal' },
  { id: 'm4', name: 'Margherita Pizza', price: 15.00, rating: 4.6, category: 'Main Dish', image: 'https://picsum.photos/400/307', dataAiHint: 'veggie pizza' },
  
  // Drinks
  { id: 'd1', name: 'Fresh Orange Juice', price: 4.50, rating: 4.8, category: 'Drinks', image: 'https://picsum.photos/400/308', dataAiHint: 'orange juice' },
  { id: 'd2', name: 'Iced Latte', price: 4.25, rating: 4.5, category: 'Drinks', image: 'https://picsum.photos/400/309', dataAiHint: 'iced coffee' },
  { id: 'd3', name: 'Mango Smoothie', price: 5.50, rating: 4.9, category: 'Drinks', image: 'https://picsum.photos/400/310', dataAiHint: 'mango smoothie' },
  { id: 'd4', name: 'Sparkling Water', price: 2.99, rating: 4.3, category: 'Drinks', image: 'https://picsum.photos/400/311', dataAiHint: 'sparkling water' },

  // Dessert
  { id: 'ds1', name: 'Chocolate Lava Cake', price: 7.99, rating: 4.9, category: 'Dessert', image: 'https://picsum.photos/400/312', dataAiHint: 'chocolate cake' },
  { id: 'ds2', name: 'New York Cheesecake', price: 8.50, rating: 4.8, category: 'Dessert', image: 'https://picsum.photos/400/313', dataAiHint: 'cheesecake slice' },
  { id: 'ds3', name: 'Tiramisu', price: 7.50, rating: 4.7, category: 'Dessert', image: 'https://picsum.photos/400/314', dataAiHint: 'tiramisu dessert' },
  { id: 'ds4', name: 'Artisanal Fruit Platter', price: 9.00, rating: 4.4, category: 'Dessert', image: 'https://picsum.photos/400/315', dataAiHint: 'fruit salad' },
];
