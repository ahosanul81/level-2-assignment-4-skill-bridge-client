import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Rating } from "@/components/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getReviewAction } from "@/actions/reviewAction";
import { TReview } from "@/types/review";

interface Reviews1Props {
  title?: string;
  className?: string;
  tutorId: string;
}

const Reviews1 = async ({
  title = "Student Reviews",
  className,
  tutorId,
}: Reviews1Props) => {
  const res = await getReviewAction(tutorId);

  const reviews: TReview[] = res?.data?.data || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>

          {/* <div className="mt-2 flex items-center gap-3">
            <Rating rate={averageRating} className="[&_svg]:size-5" />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} out of 5 · {reviews.length} reviews
            </span>
          </div> */}
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}

              <div className="space-y-3">
                {/* Rating */}
                <Rating rate={review.rating} className="[&_svg]:size-4" />

                {/* Comment */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={review.student.profilePhoto || undefined}
                      alt={review.student.name || "Student"}
                    />
                    <AvatarFallback className="text-xs">
                      {review.student.name?.charAt(0) || "S"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {review.student.name || "Anonymous Student"}
                    </span>

                    {/* Optional verified badge */}
                    <span className="flex items-center gap-1 text-emerald-600">
                      <BadgeCheck className="size-4" />
                      <span className="text-xs">Verified Booking</span>
                    </span>

                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export { Reviews1 };
