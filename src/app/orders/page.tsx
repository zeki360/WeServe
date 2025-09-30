
"use client"
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
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
import { Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Order = {
  orderId: string;
  orderMenu?: {
    menuName: string;
  };
  orderDate: string;
  orderTime: string;
  orderStatus: string;
  orderPrice: string;
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // This is a placeholder userId. In a real app, you'd get this from your auth context.
    const userId = "ZVf0lpCwbbX8nK3N7Xubg1U21Ep1";
    
    const ordersRef = ref(database, `orders/customer/${userId}`);
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userOrders = Object.values(data) as Order[];
        setOrders(userOrders.sort((a,b) => new Date(b.orderDate + " " + b.orderTime).getTime() - new Date(a.orderDate + " " + a.orderTime).getTime()));
      } else {
        setOrders([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase read failed:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Here is a list of your past and current food orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.orderMenu?.menuName || 'N/A'}</TableCell>
                    <TableCell>{order.orderDate} at {order.orderTime}</TableCell>
                    <TableCell>ETB {parseFloat(order.orderPrice).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.orderStatus === "sent" ? "secondary" : "default"
                        }
                      >
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-10">
                <p className="text-muted-foreground">You haven't placed any orders yet.</p>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
