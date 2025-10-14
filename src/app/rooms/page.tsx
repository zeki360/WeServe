
"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Wifi, Tv, Utensils, Wind, User, Star } from "lucide-react";
import Image from "next/image";
import { RoomBookingDialog } from "@/components/RoomBookingDialog";

const overviewImages = [
  { id: 1, title: "Standard Room 1", hint: "hotel room", src: "https://i.ibb.co/mdfx11t/IMG-1635.jpg" },
  { id: 2, title: "Standard Room 2", hint: "hotel room", src: "https://i.ibb.co/mdfx11t/IMG-1635.jpg" },
  { id: 3, title: "Standard Room 3", hint: "hotel room", src: "https://i.ibb.co/mdfx11t/IMG-1635.jpg" },
  { id: 4, title: "Standard Room 4", hint: "hotel room", src: "https://i.ibb.co/mdfx11t/IMG-1635.jpg" },
  { id: 5, title: "Standard Room 5", hint: "hotel room", src: "https://i.ibb.co/mdfx11t/IMG-1635.jpg" },
  { id: 6, title: "Standard Room 6", hint: "hotel room", src: "https://i.ibb.co/mdfx11t/IMG-1635.jpg" },
  { id: 7, title: "Deluxe Room 1", hint: "luxury hotel room", src: "https://i.ibb.co/gLv0cj0S/IMG-1618.jpg" },
  { id: 8, title: "Deluxe Room 2", hint: "luxury suite", src: "https://i.ibb.co/gLv0cj0S/IMG-1618.jpg" },
];

export interface RoomInfo {
  id: number;
  title: string;
  hint: string;
}

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo | null>(null);

  const handleRoomClick = (room: RoomInfo) => {
    setSelectedRoom(room);
  };

  const handleDialogClose = () => {
    setSelectedRoom(null);
  }

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Guesthouse Rooms
        </h1>
        <p className="text-muted-foreground mt-2">
          Find the perfect room for your stay.
        </p>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="info">Info & Price</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="rules">House Rules</TabsTrigger>
          <TabsTrigger value="reviews">Guest Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {overviewImages.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden group cursor-pointer"
                onClick={() => handleRoomClick(image)}
              >
                 <div className="overflow-hidden rounded-t-lg">
                  <Image
                    src={image.src}
                    width={400}
                    height={300}
                    alt={image.title}
                    data-ai-hint={image.hint}
                    className="w-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-center">{image.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Information and Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold">Standard Room</h3>
                <p>ETB 1,500.00 / night</p>
                <p className="text-muted-foreground">A cozy room perfect for solo travelers or couples. Features a king-size bed.</p>
              </div>
              <div>
                <h3 className="font-bold">Deluxe Room</h3>
                <p>ETB 2,500.00 / night</p>
                <p className="text-muted-foreground">A spacious room with a separate living area and a king-size bed, perfect for families or extended stays.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Facilities & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                <span>Free High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="h-5 w-5 text-primary" />
                <span>Flat-screen TV</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-primary" />
                <span>Comfortable Bedding</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-primary" />
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                <span>Room Service Available</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>House Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Check-in time: 2:00 PM</p>
              <p>Check-out time: 12:00 PM</p>
              <p>No smoking in rooms.</p>
              <p>No pets allowed.</p>
              <p>Please keep noise to a minimum after 10:00 PM.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <User className="h-8 w-8 text-muted-foreground mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">John Doe</h4>
                    <div className="flex">
                      {[...Array(5)].map((_,i) => <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />)}
                    </div>
                  </div>
                  <p className="text-muted-foreground">"A wonderful stay! The room was clean, and the staff were very friendly. Highly recommended."</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <User className="h-8 w-8 text-muted-foreground mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">Jane Smith</h4>
                     <div className="flex">
                      {[...Array(4)].map((_,i) => <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />)}
                      <Star className="h-4 w-4 text-muted-foreground/30" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">"Great location and comfortable room. The Wi-Fi was a bit slow, but everything else was perfect."</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedRoom && (
        <RoomBookingDialog 
          room={selectedRoom} 
          open={!!selectedRoom} 
          onOpenChange={handleDialogClose} 
        />
      )}
    </div>
  );
}
