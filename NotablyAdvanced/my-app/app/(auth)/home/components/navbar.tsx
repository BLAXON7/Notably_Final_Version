"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "./handlelogout";
import { Inbox, LayoutDashboard, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchData } from "@/fetch_Data_query/useFetchData";
import Link from "next/link";

export const Navbar = () => {
  const [showsidebar, setshowsidebar] = useState(false); // Always start with false
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration

  useEffect(() => {
    // Only run on client after hydration
    setIsHydrated(true);
    const saved = localStorage.getItem("sidebarState");
    if (saved) {
      setshowsidebar(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("sidebarState", JSON.stringify(showsidebar));
    }
  }, [showsidebar, isHydrated]);

  const { data: userdata } = useFetchData();
  return (
    <div className="flex flex-col w-full">
      {/* Navbar with fixed height */}
      <div className="flex justify-between p-3 items-center h-14 border-b border-emerald-900">
        <div className="w-36 flex-shrink-0">
          <div
            className={`flex gap-6 items-center justify-start ${
              showsidebar ? "invisible" : "visible"
            }`}
          >
            <Menu
              className="mt-3.5 text-emerald-50 cursor-pointer"
              size={24}
              onClick={() => setshowsidebar((prev) => !prev)}
            />
            <p className="mt-3 text-2xl font-bold text-white">Notably</p>
          </div>
        </div>

        <div className="flex gap-3 items-center flex-shrink-0 mt-3">
          <Button
            onClick={() => logout()}
            className="hover:cursor-pointer w-24 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
          >
            Logout
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="hidden sm:inline">
                  <AvatarImage
                    className="w-9 rounded-full border border-emerald-100"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{userdata?.Email}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-99">
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-emerald-900 shadow-lg z-50 flex flex-col p-6 transform transition-transform duration-300 ease-in-out ${
            showsidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold text-white">Notably</span>
            <Menu
              className="text-emerald-50 cursor-pointer"
              size={24}
              onClick={() => setshowsidebar(false)}
            />
          </div>
          <nav className="flex flex-col gap-6 flex-1">
            <Link href="/home/dashboard">
              <div className="gap-4 px-4 py-2 flex items-center  hover:text-white font-medium hover:bg-emerald-950 hover:rounded-2xl">
                <LayoutDashboard className="text-emerald-50" />
                <p className=" text-emerald-100">Dashboard</p>
              </div>
            </Link>
            <Link href="/home/1">
              <div className="gap-4 px-4 py-2 flex items-center  hover:text-white font-medium hover:bg-emerald-950 hover:rounded-2xl">
                <Inbox className="text-emerald-50" />

                <p className=" text-emerald-100">My Content</p>
              </div>
            </Link>
          </nav>
          <div className="mt-auto flex items-center gap-3">
            <span className="text-emerald-100">{userdata?.Email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
