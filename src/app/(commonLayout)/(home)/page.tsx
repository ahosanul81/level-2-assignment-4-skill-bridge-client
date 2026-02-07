import { Footer2 } from "@/components/footer2";
import Hero from "@/components/modules/hero/Hero";
import TutorPage from "../tutors/page";
interface IHomePageProps {
  searchParams: Promise<{ [key: string]: string }>;
}
export default async function HomePage({ searchParams }: IHomePageProps) {
  return (
    <div className="container mx-auto space-y-7">
      <Hero />
      <TutorPage searchParams={searchParams} />
      <div className="w-[90%]  mx-auto">
        <Footer2 />
      </div>
    </div>
  );
}
