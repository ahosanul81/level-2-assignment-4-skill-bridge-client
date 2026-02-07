export type IUser = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  isActive?: boolean;
  role?: "STUDENT" | "TUTOR" | "ADMIN";
  status?: "ACTIVE" | "BLOCKED" | "DELETED";
  createdAt: Date;
  updatedAt: Date;
};

export type TUpdateUser = {
  name: string;
  bio: string;
  hourlyRate: number;
  experienceYear: number;
  categoryId: string;
  slotId: string;
};
