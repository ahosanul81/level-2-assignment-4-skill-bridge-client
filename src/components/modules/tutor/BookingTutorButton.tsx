"use client";
import { bookingSessingAction } from "@/actions/bookingAction";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export default function BookingTutorButton({
  bookingInfo,
}: {
  bookingInfo: {
    categoryId: string | null;
    slotId: string | null;
    tutorId: string;
  };
}) {
  const session = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    const { categoryId, slotId, tutorId } = bookingInfo;

    if (!categoryId) {
      toast.error("No subject has been chosen");
      return;
    }

    if (!slotId) {
      toast.error("No slot has been selected");
      return;
    }

    if (!tutorId) {
      toast.error("Tutor id not found");
      return;
    }

    if (!session.data?.user.id) {
      toast.error("User not found");
      return;
    }

    const payload = {
      studentId: session.data.user.id,
      categoryId,
      slotId,
      tutorId,
    };
    // console.log(payload);
    try {
      const res = await bookingSessingAction(payload);
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      //   toast.success("Session booked successfully");
    } catch (error) {
      toast.error("Failed to book session");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleBooking}
        className="w-full"
        disabled={!bookingInfo.categoryId || !bookingInfo.slotId || loading}
      >
        {loading ? "Booking......" : "Book Session"}
      </Button>
    </div>
  );
}
