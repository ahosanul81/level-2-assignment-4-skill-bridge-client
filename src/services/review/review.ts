const addReview = async (payload: {
  studentId: string;
  tutorId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const review = { addReview };
