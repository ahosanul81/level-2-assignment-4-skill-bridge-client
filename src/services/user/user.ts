import { TUpdateUser } from "@/types/user";
// import { cookies } from "next/headers";

const getSpecificUser = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );

    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

const updateUser = async (userId: string, payload: TUpdateUser) => {
  try {
    // const cookieStore = await cookies();
    const res = await fetch(`${process.env.AUTH_URL}/user/update/${userId}`, {
      method: "PATCH",
      headers: {
        // Cookie: cookieStore.toString()
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    console.log(data);
    if (data === null) {
      return { data: null, error: { message: "data is missing" } };
    }
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
const signUp = async (payload: {
  name: string;
  email: string;
  role: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    // console.log(data);
    if (data === null) {
      return { data: null, error: { message: "data is missing" } };
    }
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
export const user = { getSpecificUser, updateUser, signUp };
