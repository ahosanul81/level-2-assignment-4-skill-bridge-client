const login = async (payload: { email: string; password: string }) => {
  try {
    const res = await fetch(`/sign-in/email`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    return { data: data.user, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

const getSession = async () => {
  try {
    const res = await fetch(`/get-session`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    console.log(res);
    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const auth = { login, getSession };
