
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Wifi, Tv, Utensils, Wind, User, Star } from "lucide-react";

export default function RoomsPage() {
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
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Our Guesthouse</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Experience comfort and convenience at our modern guesthouse. Whether you're here for business or leisure, our rooms provide a peaceful retreat. Explore the tabs above to learn more about our amenities, pricing, and what our guests have to say.
              </p>
            </CardContent>
          </Card>
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
                <p className="text-muted-foreground">A cozy room perfect for solo travelers or couples. Features a queen-sized bed.</p>
              </div>
              <div>
                <h3 className="font-bold">Deluxe Suite</h3>
                <p>ETB 2,500.00 / night</p>
                <p className="text-muted-foreground">A spacious suite with a separate living area, perfect for families or extended stays.</p>
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
    </div>
  );
}
