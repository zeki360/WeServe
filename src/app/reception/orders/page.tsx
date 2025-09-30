
"use client"
import { useEffect, useState, useMemo } from "react";
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
import { Loader, MoreHorizontal, ArrowUpDown } from "lucide-react";
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

type SortKey = 'orderUserName' | 'menuName' | 'dateTime' | 'orderType' | 'orderStatus';

export default function ReceptionOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'dateTime', direction: 'descending' });

  useEffect(() => {
    const ordersRef = ref(database, 'orders/reception');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allOrders = Object.values(data) as Order[];
        setOrders(allOrders);
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

  const sortedOrders = useMemo(() => {
    let sortableItems = [...orders];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'menuName') {
          aValue = a.orderMenu?.menuName || '';
          bValue = b.orderMenu?.menuName || '';
        } else if (sortConfig.key === 'dateTime') {
          aValue = new Date(`${a.orderDate} ${a.orderTime}`).getTime();
          bValue = new Date(`${b.orderDate} ${b.orderTime}`).getTime();
        } else {
          aValue = a[sortConfig.key as keyof Order];
          bValue = b[sortConfig.key as keyof Order];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [orders, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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
  
  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpDown className="ml-2 h-4 w-4" /> // Replace with ArrowUp icon if you prefer
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4" /> // Replace with ArrowDown icon
    );
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
          {sortedOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('orderUserName')}>
                      Customer
                      {getSortIndicator('orderUserName')}
                    </Button>
                  </TableHead>
                  <TableHead>
                     <Button variant="ghost" onClick={() => requestSort('menuName')}>
                      Item
                      {getSortIndicator('menuName')}
                    </Button>
                  </TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>
                     <Button variant="ghost" onClick={() => requestSort('dateTime')}>
                      Time
                      {getSortIndicator('dateTime')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('orderType')}>
                      Payment
                      {getSortIndicator('orderType')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('orderStatus')}>
                      Status
                      {getSortIndicator('orderStatus')}
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
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
