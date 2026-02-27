import { getAllBookingAction } from "@/actions/bookingAction";
import { BookingTable } from "@/components/modules/dashboard/admin/booking/BookingTable";
// import { booking } from "@/services/booking/booking";
import React from "react";

export default async function BookingAdminPage() {
  const res = await getAllBookingAction();
  //   console.log(res);
  return (
    <div>
      <BookingTable booking={res.data.data || []} />
    </div>
  );
}
