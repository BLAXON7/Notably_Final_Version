"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { handlelogin } from "./handleLogin";
const inter = Inter({
  subsets: [],
  weight: ["500"],
});

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
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
    await handlelogin(formData);
  };

  return (
    <div className="gap-10 w-screen h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700 flex justify-center items-center flex-col">
      <p
        className={`text-center text-5xl md:text-5xl font-bold text-emerald-200 drop-shadow-lg ${inter.className}`}
      >
        Notably
      </p>{" "}
      <Card className="justify-center w-full max-w-sm shadow-2xl backdrop-blur-xl bg-emerald-950/70 border border-emerald-400/30">
        <CardHeader>
          <CardTitle className="text-emerald-100">
            Login to your account
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Enter your email below to login to your account
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
                      message: "Invalid email address",
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
                  <a
                    href="/forgotpassword"
                    className="ml-auto inline-block text-sm text-emerald-100 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
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
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-emerald-50"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
          <div className="flex items-center gap-18 shrink-0 text-emerald-100">
            <p className="shrink-0">Dont have an account?</p>
            <Button
              onClick={() => {
                router.push("/signup");
              }}
              variant="outline"
              className="w-24 text-emerald-900 hover:bg-emerald-100"
            >
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
