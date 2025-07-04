"use client";
import React from "react";
import { useForm } from "react-hook-form"; // Remove Form import
import { handleforgotpassword } from "./handleforgotpassword";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Add Button import

type FormDataType = {
  email: string;
};

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmit = async (data: FormDataType) => {
    await handleforgotpassword({ email: data.email });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
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
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-emerald-50"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPass;
