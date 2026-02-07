const bookingSessing = async (payload: {
  studentId: string;
  categoryId: string;
  slotId: string;
  tutorId: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/booking-session`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    return { data: data.data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
const getAllBooking = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      next: { tags: ["bookingStatusTag"] },
    });

    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
export const booking = { bookingSessing, getAllBooking };
