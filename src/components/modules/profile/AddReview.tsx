/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // optional but recommended
import { addReviewAction } from "@/actions/reviewAction";
import { authClient } from "@/lib/auth-client";

type AddReviewProps = {
  tutorId: string;
};

export default function AddReview({ tutorId }: AddReviewProps) {
  const session = authClient.useSession();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔹 API function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!session.data) {
        toast.error("session not found");
        return;
      }
      if (!tutorId) {
        toast.error("Tutor not found");
        return;
      }

      if (!rating) {
        toast.error("Select rating");
        return;
      }
      if (!comment) {
        toast.error("write somthing");
        return;
      }
      const payload = {
        userId: session.data?.user.id,
        tutorId: tutorId,
        rating: rating,
        comment: comment,
      };
      const res = await addReviewAction(payload);
      console.log(res);
      if (res.data.success) {
        toast.success("Review submitted successfully");
      } else {
        toast.success(res.data.error);
      }

      // reset form
      setRating(0);
      setComment("");
    } catch (error: any) {
      console.error("Review submit error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Add a Review</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/*  Rating */}
        <div className="space-y-1">
          <Label>Rating</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-yellow-500"
              >
                <Star
                  size={22}
                  fill={star <= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          disabled={rating === 0 || loading}
          onClick={handleSubmit}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
}
