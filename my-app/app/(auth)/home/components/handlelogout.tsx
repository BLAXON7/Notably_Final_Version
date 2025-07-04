"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Couldnt log out: ", error.message);
  }

  redirect("/login");
};
