export type TTutor = {
  id: string;
  userId: string;
  name: string;
  categoryId: string | null;
  category: { id: string; name: string } | null;

  slot: { id: string; startTime: string; endTime: string } | null;
  bio: string;
  profilePhoto?: string | null;
  slotId: string | null;
  hourlyRate: number;
  experienceYear: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id?: string;
    role: string;
    email: string;
  };
  bannerUrl?: string;
};
