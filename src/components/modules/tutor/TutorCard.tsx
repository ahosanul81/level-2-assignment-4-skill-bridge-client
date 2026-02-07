"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import Image from "next/image";
import { TTutor } from "@/types/tutor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import BookingTutorButton from "./BookingTutorButton";

type TutorCardProps = {
  tutor: TTutor;
};

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="max-w-sm hover:shadow-lg transition-shadow duration-200 border rounded-xl overflow-hidden">
      {/* Banner */}
      <div className="w-full h-32 overflow-hidden ">
        <Image
          width={400}
          height={160}
          src="/tutor_banner.jpeg"
          alt="Tutor banner"
          className="w-full h-full object-cover "
        />
      </div>

      {/* Header */}
      <CardHeader className="pt-4 space-y-2">
        <div className="flex justify-between items-start">
          <Link
            href={`/profile/${tutor.userId}`}
            className="flex gap-3 items-center"
          >
            <Avatar>
              <AvatarImage
                src={tutor.profilePhoto || "/profile_img.jpeg"}
                className="border border-purple-500 p-1 rounded-full"
              />
              <AvatarFallback>{tutor.name?.charAt(0) ?? "T"}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-lg leading-none">
                {tutor.name ?? "Unnamed Tutor"}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {tutor.user.email}
              </p>
            </div>
          </Link>

          {tutor.isVerified && (
            <Badge variant="secondary" className="text-green-600">
              Verified
            </Badge>
          )}
        </div>

        <CardDescription className="line-clamp-2">{tutor.bio}</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 text-sm">
        {/* Category */}
        {tutor.category?.name && (
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-muted-foreground" />
            <Badge variant="outline">{tutor.category.name}</Badge>
          </div>
        )}

        {/* Slot */}
        {tutor.slot ? (
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span>
              {tutor.slot.startTime} – {tutor.slot.endTime}
            </span>
          </div>
        ) : (
          <p className="text-muted-foreground">No slot available</p>
        )}

        {/* Meta */}
        <div className="flex justify-between text-muted-foreground">
          <span>{tutor.experienceYear} yrs experience</span>
          <span>{tutor.hourlyRate} BDT/hr</span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <BookingTutorButton
          bookingInfo={{
            categoryId: tutor.categoryId,
            slotId: tutor?.slotId,
            tutorId: tutor.id,
          }}
        />
      </CardFooter>
    </Card>
  );
}
