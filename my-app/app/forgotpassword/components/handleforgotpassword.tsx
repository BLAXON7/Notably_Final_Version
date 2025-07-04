"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

type formdata = {
  email: string;
};

export const handleforgotpassword = async (formdata: formdata) => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formdata.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/changepassword?=${formdata.email}`,
  });

  if (error) {
    console.error("Password reset error:", error.message);
    redirect("/error");
  }

  redirect("/login");
};
