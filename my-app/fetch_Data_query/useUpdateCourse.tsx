"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useUpdateCourse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ course, userId }: { course: string; userId: number }) => {
      const response = await axios.put("/api/userdata/course", {
        course,
        userId,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update the cache with the new course data
      queryClient.setQueryData(["userdata"], (oldData: unknown) => {
        if (oldData && typeof oldData === 'object') {
          return { ...oldData as object, Course: variables.course };
        }
        return oldData;
      });
      
      // Also invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
      
      // Navigate to dashboard after successful update
      router.push("/home/dashboard");
    },
    onError: (error) => {
      console.error("Error updating course:", error);
    },
  });
};
