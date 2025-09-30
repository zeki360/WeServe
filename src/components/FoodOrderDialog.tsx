
"use client"

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import type { FoodItem } from "@/lib/data";

const orderSchema = z.object({
  quantity: z.number().min(1, "Please select a quantity."),
  paymentMethod: z.enum(["cash", "transfer", "project"], {
    required_error: "Please select a payment method.",
  }),
  deliveryDate: z.date({
    required_error: "A delivery date is required.",
  }),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface FoodOrderDialogProps {
  item: FoodItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodOrderDialog({ item, open, onOpenChange }: FoodOrderDialogProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
    form.setValue("quantity", newQuantity);
  }

  function onSubmit(data: OrderFormValues) {
    toast({
      title: "Order Submitted!",
      description: `You've ordered ${data.quantity} plate(s) of ${item.name}.`,
    });
    onOpenChange(false);
    form.reset();
    setQuantity(1);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order: {item.name}</DialogTitle>
          <DialogDescription>
            Customize your order below. Click "Place Order" when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormLabel>Quantity</FormLabel>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 h-10 flex items-center justify-center border rounded-md">{quantity}</div>
                <Button type="button" variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0,0,0,0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Total Price:</span>
                  <span className="text-2xl font-bold text-primary">ETB {(item.price * quantity).toFixed(2)}</span>
                </div>
                <Button type="submit" className="w-full">
                  Place Order
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
