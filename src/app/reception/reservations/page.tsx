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
import { hallReservations } from "@/lib/reception-data";

export default function ReceptionReservationsPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Hall Reservations</CardTitle>
          <CardDescription>
            A list of all event space and hall reservations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer / Org</TableHead>
                <TableHead>Hall</TableHead>
                <TableHead>Event Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hallReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.userName}
                  </TableCell>
                  <TableCell>{reservation.itemName}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        reservation.status === "Pending"
                          ? "destructive"
                          : reservation.status === "Confirmed"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {reservation.status}
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
