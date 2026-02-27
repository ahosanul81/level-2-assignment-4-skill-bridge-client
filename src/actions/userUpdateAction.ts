/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { TUpdateUser } from "@/types/user";
import { cookies } from "next/headers";

function removeEmptyKeys<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== "" && value !== null && value !== undefined && value !== 0,
    ),
  ) as Partial<T>;
}
export const updateUserAction = async (
  userId: string,
  payload: TUpdateUser,
) => {
  const filterdPayload = removeEmptyKeys(payload);
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/user/update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Cookie: cookieStore.toString(),
        },
        // credentials: "include",
        body: JSON.stringify(filterdPayload),
        cache: "no-store",
      },
    );

    const data = await res.json();
    if (data === null) {
      return { data: null, error: { message: "data is missing" } };
    }
    //   console.log(data);
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
