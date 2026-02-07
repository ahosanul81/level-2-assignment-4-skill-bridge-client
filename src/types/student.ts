export type TStudent = {
  id: string;
  userId: string;
  name?: string | null;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  profilePhoto?: string | null;
  user: {
    name: string;
    role: "STUDENT";
  };
};
