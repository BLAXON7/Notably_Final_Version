"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFetchData } from "@/fetch_Data_query/useFetchData";
import { useUpdateCourse } from "@/fetch_Data_query/useUpdateCourse";

export const CourseSelection = () => {
  const [courseName, setCourseName] = useState("");
  const { data: userdata } = useFetchData();
  const updateCourseMutation = useUpdateCourse();

  const handleSubmit = async () => {
    if (courseName.trim() && userdata?.id) {
      try {
        await updateCourseMutation.mutateAsync({
          course: courseName,
          userId: userdata.id,
        });
        // The mutation already handles cache invalidation
      } catch (error) {
        console.error("Failed to update course:", error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col  bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700  items-center justify-center mx-auto p-6">
      <div className="w-[50%] bg-emerald-700/60 p-6 rounded-xl backdrop-blur-xl shadow-2xl border border-emerald-200/20">
        <h2 className="text-2xl font-bold text-emerald-100 mb-6 drop-shadow-md">
          Enter Your Course
        </h2>
        <div className="space-y-6">
          <div>
            <Input
              className="text-emerald-50 bg-emerald-900/50 border-emerald-600/40 placeholder:text-emerald-400/50"
              placeholder="Course Name Here"
              value={courseName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCourseName(e.target.value);
              }}
            />
          </div>
          <Button
            className="w-full bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100 transition-all duration-300"
            disabled={!courseName.trim() || updateCourseMutation.isPending}
            onClick={handleSubmit}
          >
            {updateCourseMutation.isPending ? "Submitting..." : "Submit Course"}
          </Button>
        </div>
      </div>
    </div>
  );
};
