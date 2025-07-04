"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import { useState } from "react";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export default function Changepassword() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      setIsLoading(true);

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) {
        setError("password", {
          type: "manual",
          message: updateError.message,
        });
        return;
      }

      router.push(
        "/login?message=Password reset successful. Please login with your new password."
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("password", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-emerald-950/70 p-8 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-emerald-100">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-sm text-emerald-100">New Password</label>
            <input
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
              type="password"
              className="mt-1 block w-full rounded-md border border-emerald-700 bg-emerald-900/40 p-2 text-emerald-100"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-emerald-100">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Passwords do not match";
                  }
                },
              })}
              type="password"
              className="mt-1 block w-full rounded-md border border-emerald-700 bg-emerald-900/40 p-2 text-emerald-100"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-emerald-700 px-4 py-2 text-emerald-50 hover:bg-emerald-800 disabled:opacity-50"
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
