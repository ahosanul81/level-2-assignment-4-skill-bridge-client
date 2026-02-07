import { category } from "@/services/category/category";
import { LeftSideBar } from "./LeftSideBar";
import React from "react";
import { tutor } from "@/services/tutor/tutor";
import { TTutor } from "@/types/tutor";

export default async function CourseHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await category.getAllCategory();
  const tutorsData = await tutor.getAllTutor();
  const tutorNameList = tutorsData?.data?.map((item: TTutor) => ({
    key: "name",
    label: item.name,
  }));
  
  return (
    <div className="flex gap-4">
      <LeftSideBar categories={res.data || []} tutors={tutorNameList || []}>
        {children}
      </LeftSideBar>
    </div>
  );
}
