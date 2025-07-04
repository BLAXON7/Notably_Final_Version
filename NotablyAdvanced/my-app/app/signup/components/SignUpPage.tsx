"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Inter } from "next/font/google";
import { handlesignup } from "./handleSignup";

type FormInputs = {
  email: string;
  password: string;
};

const inter = Inter({
  subsets: [],
  weight: ["500"],
});

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    await handlesignup(formData);
  };

  return (
    <div className="gap-10 w-screen h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700 flex justify-center items-center flex-col">
      <p
        className={`text-center text-5xl md:text-5xl font-bold text-emerald-200 drop-shadow-lg ${inter.className}`}
      >
        Notably
      </p>
      <Card className="justify-center w-full max-w-sm shadow-2xl backdrop-blur-xl bg-emerald-950/70 border border-emerald-400/30">
        <CardHeader>
          <CardTitle className="text-emerald-100">
            Create a new account
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-emerald-100">
                  Email
                </Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format",
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-emerald-900/40 border-emerald-700 text-emerald-100"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-emerald-100">
                    Password
                  </Label>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Password must contain at least one letter and one number",
                    },
                  })}
                  id="password"
                  type="password"
                  className="bg-emerald-900/40 border-emerald-700 text-emerald-100"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-emerald-50"
          >
            Sign Up
          </Button>
          <div className="flex items-center gap-14 shrink-0">
            <p className="shrink-0 text-emerald-100">
              Already have an account?
            </p>
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="w-24 text-emerald-900 hover:bg-emerald-100"
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
