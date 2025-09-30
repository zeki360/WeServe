
"use client"
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue, set } from "firebase/database";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Loader, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Order = {
  orderId: string;
  orderUserName: string;
  orderMenu?: {
    menuName: string;
  };
  orderDate: string;
  orderTime: string;
  orderStatus: string;
  orderDish: string; // Quantity
  orderPrice: string; // Total Price
  orderType: string; // Payment method ('Personal' or 'Project')
  orderUserId: string;
};

export default function ReceptionOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const ordersRef = ref(database, 'orders/reception');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allOrders = Object.values(data) as Order[];
        setOrders(allOrders.sort((a,b) => new Date(b.orderDate + " " + b.orderTime).getTime() - new Date(a.orderDate + " " + a.orderTime).getTime()));
      } else {
        setOrders([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase read failed:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (order: Order, newStatus: string) => {
    const receptionOrderRef = ref(database, `orders/reception/${order.orderId}/orderStatus`);
    const customerOrderRef = ref(database, `orders/customer/${order.orderUserId}/${order.orderId}/orderStatus`);
    
    try {
      await set(receptionOrderRef, newStatus);
      await set(customerOrderRef, newStatus);
      toast({
        title: "Status Updated",
        description: `Order ${order.orderId} is now ${newStatus}.`
      })
    } catch(error) {
      console.error("Failed to update status: ", error);
      toast({
        title: "Update Failed",
        description: "Could not update the order status.",
        variant: "destructive",
      })
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "sent":
        return "secondary";
      case "confirmed":
        return "default";
      case "completed":
        return "outline";
      case "canceled":
        return "destructive";
      default:
        return "outline";
    }
  };

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
          <CardTitle>Food Orders</CardTitle>
          <CardDescription>
            A list of recent food orders from customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.orderUserName}</TableCell>
                    <TableCell>{order.orderMenu?.menuName || 'N/A'}</TableCell>
                    <TableCell>{order.orderDish}</TableCell>
                    <TableCell>ETB {parseFloat(order.orderPrice).toFixed(2)}</TableCell>
                    <TableCell>{order.orderDate} at {order.orderTime}</TableCell>
                    <TableCell>{order.orderType}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(order.orderStatus)}>
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            disabled={order.orderStatus === 'completed' || order.orderStatus === 'canceled'}
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           {order.orderStatus === 'sent' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order, 'confirmed')}>
                              Mark as Confirmed
                            </DropdownMenuItem>
                          )}
                          {order.orderStatus === 'confirmed' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order, 'completed')}>
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          {(order.orderStatus === 'sent' || order.orderStatus === 'confirmed') && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleStatusUpdate(order, 'canceled')}
                              >
                                Cancel Order
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No orders found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
