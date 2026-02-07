import { user } from "@/services/user/user";
import TutorProfileCard from "./TutorProfileCard";
import { Reviews1 } from "@/components/reviews1";
import StudentProfileCard from "./StudentProfileCard";
import AddReview from "./AddReview";

type TutorProfileProps = {
  params: Promise<{ userId: string }>;
};

export default async function ProfileCard({ params }: TutorProfileProps) {
  const res = await user.getSpecificUser((await params).userId);

  if (res.data.data.user.role === "TUTOR") {
    return (
      <div className="space-y-4">
        <TutorProfileCard tutor={res.data.data} />
        <AddReview tutorId={res.data.data.id} />
        <Reviews1 tutorId={res.data.data.id} />
      </div>
    );
  } else {
    return (
      <>
        <StudentProfileCard student={res.data.data} />
      </>
    );
  }
}
