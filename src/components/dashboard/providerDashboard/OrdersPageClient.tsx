"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { orderService } from "@/services/order.service";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

interface SessionUser {
  id: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
}

interface Order {
  id: string;
  address: string;
  totalAmount: number;
  status: OrderStatus;
  items: {
    id: string;
    quantity: number;
    meal: {
      name: string;
      price: number;
      image?: string;
    };
  }[];
  provider: {
    restaurantName: string;
    logo?: string;
    phone?: string;
  };
}

const allowedStatusMap: Record<OrderStatus, OrderStatus[]> = {
  PLACED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const OrdersPageClient = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");

  useEffect(() => {
    if (!user) return;
    orderService.getAllOrders().then(({ data, error }) => {
      if (error) toast.error(error);
      else setOrders(data || []);
    });
  }, [user]);

  if (!user) return <p className="text-center py-20">Please login first.</p>;

  if (user.role !== "PROVIDER")
    return (
      <p className="text-center py-20 text-red-600">
        You are not allowed to access this page.
      </p>
    );

  const badgeStyle = (status: OrderStatus) =>
    ({
      PLACED: "bg-gray-200 text-gray-800",
      PREPARING: "bg-yellow-400 text-black",
      READY: "bg-blue-500 text-white",
      DELIVERED: "bg-green-600 text-white",
      CANCELLED: "bg-red-600 text-white",
    })[status];

  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setSelectedStatus("");
    setOpen(true);
  };

  const confirmUpdate = async () => {
    if (!selectedOrder || !selectedStatus) return;

    setLoadingId(selectedOrder.id);

    const { error } = await orderService.updateOrderStatus(
      selectedOrder.id,
      selectedStatus,
    );

    if (error) toast.error(error);
    else {
      toast.success("Order updated");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: selectedStatus } : o,
        ),
      );
    }

    setLoadingId(null);
    setOpen(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-2 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">Incoming Orders</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-3 lg:p-5 flex flex-col lg:flex-row gap-6"
          >
            {/* Provider */}
            <div className="flex items-center gap-3 lg:w-56">
              {order.provider.logo && (
                <Image
                  src={order.provider.logo}
                  alt={order.provider.restaurantName}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{order.provider.restaurantName}</p>
                <p className="text-sm text-gray-500">{order.provider.phone}</p>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm break-all">Order #{order.id}</p>
                <Badge className={badgeStyle(order.status)}>
                  {order.status}
                </Badge>
              </div>

              <p className="text-sm">
                <b>Address:</b> {order.address}
              </p>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-gray-50 p-2 rounded"
                >
                  {item.meal.image && (
                    <Image
                      src={item.meal.image}
                      alt={item.meal.name}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.meal.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ৳{item.meal.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ৳{item.meal.price * item.quantity}
                  </p>
                </div>
              ))}

              <p className="font-bold text-right">
                Total: ৳{order.totalAmount}
              </p>
            </div>

            {/* Action */}
            {allowedStatusMap[order.status].length > 0 && (
              <div className="lg:w-48 flex items-end">
                <Button className="w-full" onClick={() => openDialog(order)}>
                  Update Status
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>

          <Select onValueChange={(v) => setSelectedStatus(v as OrderStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {selectedOrder &&
                allowedStatusMap[selectedOrder.status].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmUpdate}
              disabled={!selectedStatus || loadingId !== null}
            >
              {loadingId ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Updating
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersPageClient;