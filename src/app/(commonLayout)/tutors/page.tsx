import CourseHomeLayout from "@/components/modules/home/course/CourseHomeLayout";
import { TutorCard } from "@/components/modules/tutor/TutorCard";
import { tutor } from "@/services/tutor/tutor";
import { TTutor } from "@/types/tutor";
interface IHomePageProps {
  searchParams: Promise<{ [key: string]: string }>;
}
export default async function TutorPage({ searchParams }: IHomePageProps) {
  const tutors = await tutor.getAllTutor(await searchParams);

  return (
    <div className="w-[90%] mx-auto">
      <CourseHomeLayout>
        <div className="grid grid-cols-2 gap-4">
          {tutors &&
            tutors?.data?.map((tutor: TTutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </div>
      </CourseHomeLayout>
    </div>
  );
}
