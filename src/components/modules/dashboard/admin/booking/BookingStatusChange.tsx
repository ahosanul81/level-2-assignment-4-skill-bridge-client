"use client";
import { bookingStatusUpdate } from "@/actions/bookingAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TBooking } from "@/types/booking";
const statusBgMap: Record<TBooking["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-green-100 text-green-700",
};

type Props = {
  item: {
    id: string;
    status: TBooking["status"];
  };
};

export default function BookingStatusChange({ item }: Props) {
  const handleStatusChange = async (
    bookingId: string,
    status: TBooking["status"],
  ) => {
    const res = await bookingStatusUpdate(bookingId, { status });

    console.log(res);
  };

  return (
    <Select
      value={item.status}
      onValueChange={(value) =>
        handleStatusChange(item.id, value as TBooking["status"])
      }
    >
      {/* ✅ Background should be here */}
      <SelectTrigger className={`w-[140px] ${statusBgMap[item.status]}`}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
      </SelectContent>
    </Select>
  );
}
