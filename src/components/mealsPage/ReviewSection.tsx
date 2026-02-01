"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { orderService } from "@/services/order.service";
import { reviewService } from "@/services/review.service";


interface ReviewSectionProps {
  mealId: string;
  loggedInUser?: any;
  userInfo?: any;
}

export default function ReviewSection({
  mealId,
  loggedInUser,
  userInfo,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [myReview, setMyReview] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [isDelivered, setIsDelivered] = useState(false);
  const [checkingOrder, setCheckingOrder] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isCustomer = loggedInUser?.role === "CUSTOMER";
  const isAdmin = loggedInUser?.role === "ADMIN";

  const loadReviews = async () => {
    const res = await reviewService.getAllReviews();

    const mealReviews = res.data
      .filter((r: any) => r.mealId === mealId)
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      )
      .slice(0, 10);

    setReviews(mealReviews);

    if (loggedInUser) {
      const mine = mealReviews.find((r: any) => r.userId === loggedInUser.id);
      setMyReview(mine || null);

      if (mine) {
        setRating(mine.rating);
        setComment(mine.comment || "");
      }
    }
  };

  const checkDeliveredOrder = async () => {
    if (!loggedInUser || !isCustomer) {
      setCheckingOrder(false);
      return;
    }

    const res = await orderService.getAllOrders();
    const orders = res.data || [];

    const delivered = orders.some(
      (order: any) =>
        order.customerId === loggedInUser.id &&
        order.status === "DELIVERED" &&
        order.items?.some((item: any) => item.mealId === mealId),
    );

    setIsDelivered(delivered);
    setCheckingOrder(false);
  };

  useEffect(() => {
    loadReviews();
    checkDeliveredOrder();
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (myReview) {
        await reviewService.updateReview(myReview.id, {
          rating,
          comment,
        });
        toast.success("Review updated");
      } else {
        await reviewService.createReview({
          mealId,
          rating,
          comment,
        });
        toast.success("Review submitted");
      }
      setOpen(false);
      loadReviews();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await reviewService.deleteReview(id);
      toast.success("Review deleted");
      loadReviews();
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {reviews.length === 0 && <p className="text-gray-500">No reviews yet</p>}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-xl border bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">⭐ {review.rating} / 5</p>

              {isAdmin && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === review.id}
                  className="cursor-pointer disabled:cursor-not-allowed"
                  onClick={() => handleDelete(review.id)}
                >
                  {deletingId === review.id ? "Deleting..." : "Delete"}
                </Button>
              )}
            </div>

            {review.comment && (
              <p className="text-gray-600 mt-2">
                {userInfo?.name || "Anonymous"}: {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="min-h-11 flex items-center">
        {checkingOrder ? (
          <p className="text-sm text-gray-400 animate-pulse">
            Checking if you can review this meal...
          </p>
        ) : (
          isCustomer &&
          isDelivered && (
            <Button className="cursor-pointer" onClick={() => setOpen(true)}>
              {myReview ? "Edit your review" : "Write a review"}
            </Button>
          )
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {myReview ? "Edit Review" : "Write Review"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star
                </option>
              ))}
            </select>

            <Textarea
              placeholder="Write your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              {submitting
                ? myReview
                  ? "Updating..."
                  : "Submitting..."
                : myReview
                  ? "Update"
                  : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}