"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "./fetchdataquery";

export const useFetchData = () => {
  const queryClient = useQueryClient();
  
  const { data, refetch, isLoading, isSuccess, isError, error } = useQuery({
    queryFn: fetchUser,
    queryKey: ["userdata"],
  });

  
  
  const invalidateUserData = () => {
    queryClient.invalidateQueries({ queryKey: ["userdata"] });
  };

  return { 
    data, 
    refetch, 
    invalidateUserData, 
    isLoading, 
    isSuccess, 
    isError, 
    error 
  };
};
