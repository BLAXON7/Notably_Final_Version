"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <Button
        onClick={() => router.push("/login")}
        className="w-32 p-5 bg-emerald-950 hover:bg-emerald-700 active:bg-emerald-950 border-1 border-emerald-950"
      >
        Login/Signup
      </Button>
    </div>
  );
};

export default LoginButton;
