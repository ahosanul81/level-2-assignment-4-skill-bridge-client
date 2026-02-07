"use server";

import { user } from "@/services/user/user";

export const signUpAction = async (payload: {
  name: string;
  email: string;
  role: string;
  password: string;
}) => {
  const res = await user.signUp(payload);
  return res;
};
// export const userAction = { signUpAction };
