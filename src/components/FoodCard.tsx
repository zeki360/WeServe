import Image from "next/image"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import type { FoodItem } from "@/lib/data"
import Rating from "./Rating"

type FoodCardProps = {
  item: FoodItem
}

export default function FoodCard({ item }: FoodCardProps) {
  return (
    <Card className="overflow-hidden group border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={300}
          className="w-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.dataAiHint}
          onError={(e) => {
            // Fallback to placeholder if the local image fails to load
            e.currentTarget.src = `https://picsum.photos/400/300?random=${item.id}`;
          }}
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-bold font-headline leading-none tracking-tight truncate">{item.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
          <Rating value={item.rating} />
        </div>
      </CardContent>
    </Card>
  )
}
