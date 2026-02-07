import { getAllBookingAction } from "@/actions/bookingAction";
import { BookingTable } from "@/components/modules/dashboard/admin/booking/BookingTable";

export default async function BookingPage() {
  const res = await getAllBookingAction();
  // console.log(res);
  return (
    <div>
      <BookingTable booking={res.data.data || []} />
    </div>
  );
}
