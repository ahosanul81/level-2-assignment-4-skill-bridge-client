export type TReview = {
  id: string;
  tutorId: string;
  studentId: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  student: {
    name: string | null;
    profilePhoto: string | null;
  };
};
