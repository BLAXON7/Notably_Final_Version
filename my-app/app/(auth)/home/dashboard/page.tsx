"use server";
import React from "react";
import { Navbar } from "../components/navbar";
import DashboardPage from "./components/DashboardPage";

const page = () => {
  return (
    <div className="gap-4 w-screen h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700 flex flex-col">
      <Navbar />
      <DashboardPage />
    </div>
  );
};

export default page;
