
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const reservationOptions = [
  {
    title: "Main Hall",
    description: "Perfect for large events, conferences, and weddings. Accommodates up to 200 guests.",
    image: {
      src: "https://i.ibb.co/6R73dqRx/IMG-1662.jpg",
      width: 600,
      height: 400,
      alt: "An elegant event hall with round tables and decorations.",
      "data-ai-hint": "event hall"
    }
  },
  {
    title: "Meeting Hall",
    description: "Ideal for corporate meetings, workshops, and presentations. Equipped with modern AV technology.",
    image: {
      src: "https://i.ibb.co/5WQPf5BK/IMG-1683.jpg",
      width: 600,
      height: 400,
      alt: "A modern meeting room with a large screen and a long table.",
      "data-ai-hint": "boardroom presentation"
    }
  },
  {
    title: "Training Center",
    description: "A flexible space designed for training sessions and educational seminars.",
    image: {
      src: "https://picsum.photos/seed/seminar-room/600/400",
      width: 600,
      height: 400,
      alt: "A classroom-style setup for a training session.",
      "data-ai-hint": "training classroom"
    }
  }
];

export default function ReservationPage() {
  return (
    <div className="p-4 md:p-6">
      <header 
        className="relative rounded-lg overflow-hidden mb-6 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.ibb.co/GfvnRXmK/IMG-1664.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative p-12 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Book a Space
          </h1>
          <p className="text-lg md:text-xl mt-2 text-white/90">
            Reserve one of our versatile spaces for your next event.
          </p>
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reservationOptions.map((option) => (
          <Card 
            key={option.title} 
            className={cn(
              "overflow-hidden group border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300 ease-in-out",
              "bg-[#007965] text-white"
            )}
          >
            <div className="overflow-hidden">
              <Image
                src={option.image.src}
                width={option.image.width}
                height={option.image.height}
                alt={option.image.alt}
                data-ai-hint={option.image['data-ai-hint']}
                className="w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline">{option.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className={cn("flex-grow", "text-white/90")}>{option.description}</p>
              <Button 
                className="mt-4 w-full"
                variant={"default"}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
