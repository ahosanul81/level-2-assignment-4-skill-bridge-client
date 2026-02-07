/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type Review = {
  id: string;
  rating: number;
  comment: string;
  studentName: string;
  createdAt: string;
};

type ReviewCardProps = {
  tutorId: string;
};

export default function ReviewCard({ tutorId }: ReviewCardProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/reviews?tutorId=${tutorId}`);
        const data = await res.json();
        setReviews(
          data.map((r: any) => ({
            id: r.id,
            rating: r.rating,
            comment: r.comment,
            studentName: r.student.name,
            createdAt: r.createdAt,
          })),
        );
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    }
    fetchReviews();
  }, [tutorId]);

  // Add review
  const handleAddReview = async () => {
    if (!newReview) return toast.error("Review cannot be empty");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorId,
          rating,
          comment: newReview,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const data = await res.json();
      setReviews([data, ...reviews]);
      setNewReview("");
      toast.success("Review added successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Review */}
      <Card>
        <CardHeader>
          <CardTitle>Add a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label>Rating:</Label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
          <div className="space-y-1">
            <Label>Comment</Label>
            {/* <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
            /> */}
          </div>
          <Button onClick={handleAddReview}>Submit Review</Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id}>
            <CardHeader className="flex justify-between">
              <span className="font-semibold">{r.studentName}</span>
              <span className="text-yellow-500 font-bold">{r.rating}/5</span>
            </CardHeader>
            <CardContent>
              <p>{r.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
