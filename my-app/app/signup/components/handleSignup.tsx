"use server";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handlesignup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email === "" || password === "") {
    return;
  }

  const { data: userdata, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    redirect("/error");
  }

  const {} = await supabase
    .from("User")
    .insert({ id: userdata.user?.id, Email: email })
    .single();

  revalidatePath("/", "layout");
  redirect("/login");
}
