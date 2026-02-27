// import { cookies } from "next/headers";

const login = async (payload: { email: string; password: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
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
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

const getSession = async () => {
  // const cookieStore = Cookies.get('name')
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/get/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
const signOut = async () => {
  // const cookieStore = Cookies.get('name')
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/sign-out`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await res.json();

    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const auth = { login, getSession, signOut };
