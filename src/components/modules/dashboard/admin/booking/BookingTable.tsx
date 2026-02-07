// "use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TBooking } from "@/types/booking";
import BookingStatusChange from "./BookingStatusChange";

interface IBookingTableProps {
  booking: TBooking[];
}

export async function BookingTable({ booking }: IBookingTableProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Booking Statistics</h1>
      <Table>
        {/* <TableCaption>Booking Statistics</TableCaption> */}

        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Tutor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Slot</TableHead>
            <TableHead>Booked At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {booking?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.student.name || "Not available"}
              </TableCell>

              <TableCell>{item.tutor.name || "Not available"}</TableCell>

              <TableCell>{item.category.name || "Not available"}</TableCell>

              <TableCell>
                {item.slot.startTime} - {item.slot.endTime}
              </TableCell>

              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <BookingStatusChange
                  item={{ id: item.id, status: item.status }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total Bookings: {booking.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
