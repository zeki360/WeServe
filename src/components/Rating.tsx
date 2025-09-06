import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type RatingProps = {
  value: number;
  totalStars?: number;
  className?: string;
}

export default function Rating({ value, totalStars = 5, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="text-sm font-bold text-amber-600">{value.toFixed(1)}</span>
      <div className="flex">
        {[...Array(totalStars)].map((_, i) => {
          const starValue = i + 1;
          return (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                starValue <= Math.round(value)
                  ? "text-amber-500 fill-amber-500"
                  : "text-muted-foreground/30"
              )}
            />
          );
        })}
      </div>
    </div>
  )
}
