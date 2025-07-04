"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useFetchData } from "@/fetch_Data_query/useFetchData";
import { redirect } from "next/navigation";

const DashboardPage = () => {

  useEffect(() => {
    setTimeout(() => {
        <div className="bg-emerald-950 text-lg">Loading....</div>
    },2000);
  },[])
  
    const { data: userdata,isLoading } = useFetchData();

if (isLoading) {
  return <div>Loading...</div>;
}

  if (!userdata?.Course) {
    redirect("/home/courseselection");
  }

  return (
    <div className="flex items-center justify-center h-full  overflow-hidden">
      <div className="w-[90vw] max-w-5xl max-h-[90vh] bg-emerald-800/50 flex flex-col md:flex-row rounded-2xl backdrop-blur-xl shadow-2xl border border-emerald-300/20 overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-[40%] flex flex-col gap-4 items-center justify-center p-6 bg-emerald-900/30">
          <Avatar>
            <AvatarImage
              className="w-28 md:w-36 rounded-full border-4 border-emerald-500 shadow-md"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback className="text-emerald-300 font-semibold">
              DP
            </AvatarFallback>
          </Avatar>
          <p className="text-emerald-100 text-lg font-semibold mt-2">
            Welcome Back {userdata?.Course} student!
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full bg-emerald-700/40 flex items-center justify-center">
          <div className="w-[90%] gap-4 flex flex-col justify-center py-6">
            <div className="space-y-4 text-emerald-100/90 text-base md:text-xl font-light leading-relaxed">
              <div>
                <p className="text-sm md:text-base text-emerald-300 uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="text-lg font-semibold text-emerald-100 break-words">
                  {userdata?.Email}
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base text-emerald-300 uppercase tracking-wide mb-1">
                  User ID
                </p>
                <p className="text-lg font-semibold text-emerald-100 break-words">
                  {userdata?.id}
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base text-emerald-300 uppercase tracking-wide mb-1">
                  Notes Count
                </p>
                <p className="text-lg font-semibold text-emerald-100">
                  {userdata?.Notecount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
