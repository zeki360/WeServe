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
import { foodOrders } from "@/lib/reception-data";

export default function ReceptionOrdersPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Food Orders</CardTitle>
          <CardDescription>
            A list of recent food orders from customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.userName}</TableCell>
                  <TableCell>{order.itemName}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Pending"
                          ? "destructive"
                          : order.status === "Confirmed"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {order.status}
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
