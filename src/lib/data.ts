export type FoodItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: 'Breakfast' | 'Main Dish' | 'Drinks' | 'Dessert';
  image: string;
  dataAiHint: string;
};
