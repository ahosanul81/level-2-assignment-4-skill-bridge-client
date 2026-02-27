"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TTutor } from "@/types/tutor";
import { UpdateProfileModal } from "./UpdateProfileModal";

type TutorProfileProps = {
  tutor: TTutor;
};

export default function TutorProfileCard({ tutor }: TutorProfileProps) {
  return (
    <div className=" space-y-6">
      {/* Tutor Info */}
      <Card>
        <CardHeader>
          <CardTitle>Tutor Info</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Avatar className="w-25 h-25 ">
            <AvatarImage
              className=""
              src={tutor.profilePhoto || "/profile_img.jpeg"}
              alt={tutor.name || "profile_img"}
            />
          </Avatar>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{tutor.name || "Unnamed"}</p>
            <p className="text-gray-600">{tutor.bio}</p>
            <p className="text-gray-600">
              <span className="font-semibold">Role:</span> {tutor.user?.role}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {tutor?.category?.name}
            </p>
            <p>
              <span className="font-semibold">Hourly Rate:</span>{" "}
              {tutor.hourlyRate} / hr
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {tutor.experienceYear} years
            </p>
            <p>
              <span className="font-semibold">Slot:</span>{" "}
              {tutor?.slot?.startTime} - {tutor?.slot?.endTime}
            </p>
            <p>
              <span className="font-semibold">Verified:</span>{" "}
              {tutor.isVerified ? "Yes" : "No"}
            </p>
          </div>
        </CardContent>
        <div className="h-7/12">
          <UpdateProfileModal />
        </div>
      </Card>

      {/* Review Section */}
    </div>
  );
}
