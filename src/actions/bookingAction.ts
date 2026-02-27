/* eslint-disable @typescript-eslint/no-explicit-any */
// src/actions/bookingAction.ts
"use server";

import { TBooking } from "@/types/booking";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const bookingSessingAction = async (payload: {
  studentId: string;
  categoryId: string;
  slotId: string;
  tutorId: string;
}) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/booking/booking-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );
    // console.log(res);

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("Booking action error:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
};

export const getAllBookingAction = async () => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/booking`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const bookingStatusUpdate = async (
  bookingId: string,
  payload: { status: TBooking["status"] },
) => {
  const cookieStore = await cookies();
  const url = new URL(
    `${process.env.BACKEND_BASE_URL}/booking/booking-session/update/${bookingId}`,
  );
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["bookingStatusTag"] },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    revalidateTag("bookingStatusTags", "max");
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
