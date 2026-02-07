"use server";
import { cookies } from "next/headers";

export const addReviewAction = async (payload: {
  userId: string;
  tutorId: string;
  rating: number;
  comment: string;
}) => {
  const cookieStore = (await cookies()).get("better-auth.session_token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/review/add-review`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Cookie: `better-auth.session_token=${cookieStore}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
export const getReviewAction = async (tutorId: string) => {
  const cookieStore = (await cookies()).get("better-auth.session_token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/review/${tutorId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Cookie: `better-auth.session_token=${cookieStore}`,
        },
      },
    );

    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
