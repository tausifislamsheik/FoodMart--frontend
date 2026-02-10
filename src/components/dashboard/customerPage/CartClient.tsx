"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderData, orderService } from "@/services/order.service";
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
import { mealService } from "@/services/meal.service";
import { cartService, UpdateCartItemPayload } from "@/services/cart.service";


interface CartItem {
  id: string;
  userId: string;
  mealId: string;
  quantity: number;
  mealName: string;
  mealPrice: number;
  mealImage?: string;
}

interface Props {
  userId: string;
}

const CartClient = ({ userId }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(1);
  const [orderAddress, setOrderAddress] = useState<string>("");

  const [loadingUpdateId, setLoadingUpdateId] = useState<string | null>(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await cartService.getCartItems();
      const userCart = res.data.filter((item: any) => item.userId === userId);
      setCartItems(userCart);
    } catch (err: any) {
      toast.error(err.message || "Failed to load cart items");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = async () => {
    if (!selectedItem) return;
    setLoadingUpdateId(selectedItem.id);
    try {
      const payload: UpdateCartItemPayload = { quantity: newQuantity };
      const res = await cartService.updateCartItem(selectedItem.id, payload);
      if (res?.success) {
        toast.success("Quantity updated!");
        fetchCart();
        setIsUpdateOpen(false);
      } else toast.error(res?.error || "Failed to update");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
    setLoadingUpdateId(null);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setLoadingDeleteId(selectedItem.id);
    try {
      const res = await cartService.deleteCartItem(selectedItem.id);
      if (res?.success) {
        toast.success("Item deleted!");
        fetchCart();
        setIsDeleteOpen(false);
      } else toast.error(res?.error || "Failed to delete item");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
    setLoadingDeleteId(null);
  };

  const handleOrder = async () => {
    if (!selectedItem || !orderAddress) {
      toast.error("Please enter a delivery address!");
      return;
    }
    setLoadingOrderId(selectedItem.id);

    try {
      const mealRes = await mealService.getMealById(selectedItem.mealId);
      const mealData = mealRes.data;
      const providerId = mealData.providerId;

      const orderPayload: OrderData = {
        customerId: selectedItem.userId,
        providerId,
        address: orderAddress,
        totalAmount: selectedItem.mealPrice * selectedItem.quantity,
        items: [
          { mealId: selectedItem.mealId, quantity: selectedItem.quantity },
        ],
      };

      const res = await orderService.createOrder(orderPayload);

      if (res.error) toast.error(res.error);
      else {
        toast.success("Order placed successfully!");
        await cartService.deleteCartItem(selectedItem.id);
        fetchCart();
        setIsOrderOpen(false);
        setOrderAddress("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    }

    setLoadingOrderId(null);
  };

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            {item.mealImage && (
              <Image
                src={item.mealImage}
                alt={item.mealName}
                width={80}
                height={80}
                className="rounded-md"
                unoptimized
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">{item.mealName}</h2>
              <p className="text-gray-500">Price: ${item.mealPrice}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-gray-500">
                Total: ${(item.mealPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Dialog
              open={isUpdateOpen && selectedItem?.id === item.id}
              onOpenChange={setIsUpdateOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedItem(item);
                    setNewQuantity(item.quantity);
                    setIsUpdateOpen(true);
                  }}
                  disabled={loadingUpdateId === item.id}
                  className="cursor-pointer bg-green-700 hover:bg-green-600"
                >
                  {loadingUpdateId === item.id ? "Updating..." : "Update"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Update Quantity</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="number"
                    min={1}
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                  />
                  <DialogFooter>
                    <Button onClick={handleUpdate} className="cursor-pointer bg-green-700 hover:bg-green-600">
                      {loadingUpdateId === item.id ? "Updating..." : "Save"}
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isDeleteOpen && selectedItem?.id === item.id}
              onOpenChange={setIsDeleteOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDeleteOpen(true);
                  }}
                  disabled={loadingDeleteId === item.id}
                  className="cursor-pointer"
                >
                  {loadingDeleteId === item.id ? "Deleting..." : "Delete"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to remove {item.mealName}?</p>
                <DialogFooter>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    {loadingDeleteId === item.id
                      ? "Deleting..."
                      : "Yes, Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isOrderOpen && selectedItem?.id === item.id}
              onOpenChange={(open) => {
                setIsOrderOpen(open);
                if (!open) setOrderAddress("");
              }}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedItem(item);
                    setIsOrderOpen(true);
                  }}
                  disabled={loadingOrderId === item.id}
                  className="cursor-pointer text-white hover:text-white bg-orange-500 hover:bg-orange-600"
                >
                  {loadingOrderId === item.id ? "Ordering..." : "Order"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Place Order</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Enter your delivery address for {item.mealName}:</p>
                  <Input
                    type="text"
                    placeholder="Enter address"
                    value={orderAddress}
                    onChange={(e) => setOrderAddress(e.target.value)}
                  />
                  <DialogFooter>
                    <Button
                      onClick={handleOrder}
                      className="cursor-pointer bg-orange-500 hover:bg-orange-600"
                      disabled={!orderAddress || loadingOrderId === item.id}
                    >
                      {loadingOrderId === item.id
                        ? "Ordering..."
                        : "Yes, Order"}
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartClient;