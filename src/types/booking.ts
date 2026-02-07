export type TCategory = {
  name: string;
};

export type TSlot = {
  startTime: string;
  endTime: string;
};

export type PersonRef = {
  id: string;
  name: string | null;
};

export type SessionStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type TBooking = {
  id: string;
  category: TCategory;
  slot: TSlot;
  status: SessionStatus;

  student: PersonRef;
  tutor: PersonRef;

  createdAt: string;
  updatedAt: string;
};
