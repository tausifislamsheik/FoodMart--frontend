"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { OrderData, orderService } from "@/services/order.service";
import { useState } from "react";
import { toast } from "sonner";

interface OrderButtonProps {
  mealId: string;
  mealName: string;
  mealPrice: number;
  providerId: string;
  customerId: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  mealId,
  mealName,
  mealPrice,
  providerId,
  customerId,
}) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const total = mealPrice * quantity;

  const handleOrder = async () => {
    if (!address.trim()) {
      toast.error("Address is required!");
      return;
    }
    setLoading(true);

    const payload: OrderData = {
      customerId,
      providerId,
      address,
      totalAmount: total,
      items: [{ mealId, quantity }],
    };

    const { data, error } = await orderService.createOrder(payload);
    setLoading(false);

    if (data) {
      toast.success("Ordered successfully!");
      setOpen(false);
      setQuantity(1);
      setAddress("");
    } else {
      toast.error(error || "Failed to order meal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full py-3 text-lg font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-md cursor-pointer">
          {loading ? "Ordering..." : "Order Now"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order {mealName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Address
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="mt-1 w-full"
            />
          </div>
          <p className="text-gray-700 font-semibold">
            Total: ৳ {total.toFixed(2)}
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={handleOrder}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
          >
            {loading ? "Ordering..." : "Confirm Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderButton;