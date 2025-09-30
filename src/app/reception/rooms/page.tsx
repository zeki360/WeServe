import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { roomBookings } from "@/lib/reception-data";

export default function ReceptionRoomsPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Room Bookings</CardTitle>
          <CardDescription>
            A list of all guesthouse room bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Check-in Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.userName}</TableCell>
                  <TableCell>{booking.itemName}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "Pending"
                          ? "destructive"
                          : booking.status === "Confirmed"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
