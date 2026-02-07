import ProfileCard from "@/components/modules/profile/ProfileCard";

interface IProfileProps {
  params: Promise<{ userId: string }>;
}
export default async function ProfilePage({ params }: IProfileProps) {
  return (
    <div className="w-3/5 mx-auto">
      <ProfileCard params={params} />
    </div>
  );
}
