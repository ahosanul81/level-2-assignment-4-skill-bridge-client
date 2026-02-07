const getAllTutor = async (params?: { [key: string]: string }) => {
  const url = new URL(`${process.env.BACKEND_BASE_URL}/tutor`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    return { data: data.data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};
export const tutor = { getAllTutor };
