import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const reservationOptions = [
  {
    title: "Main Hall",
    description: "Perfect for large events, conferences, and weddings. Accommodates up to 200 guests.",
    image: {
      src: "https://picsum.photos/seed/main-hall/600/400",
      width: 600,
      height: 400,
      alt: "A large, elegant hall set up for a conference.",
      "data-ai-hint": "conference hall"
    }
  },
  {
    title: "Meeting Hall",
    description: "Ideal for corporate meetings, workshops, and presentations. Equipped with modern AV technology.",
    image: {
      src: "https://picsum.photos/seed/meeting-hall/600/400",
      width: 600,
      height: 400,
      alt: "A modern meeting room with a large screen.",
      "data-ai-hint": "meeting room"
    }
  },
  {
    title: "Training Center",
    description: "A flexible space designed for training sessions and educational seminars.",
    image: {
      src: "https://picsum.photos/seed/training-center/600/400",
      width: 600,
      height: 400,
      alt: "A classroom-style setup for a training session.",
      "data-ai-hint": "training center"
    }
  }
];

export default function ReservationPage() {
  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Book a Space
        </h1>
        <p className="text-muted-foreground mt-2">
          Reserve one of our versatile spaces for your next event.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reservationOptions.map((option) => (
          <Card key={option.title} className="overflow-hidden group border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300 ease-in-out">
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
              <p className="text-muted-foreground flex-grow">{option.description}</p>
              <Button className="mt-4 w-full">
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
