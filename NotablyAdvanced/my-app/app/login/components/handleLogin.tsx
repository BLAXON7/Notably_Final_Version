"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";

export async function handlelogin(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (data.email === "" || data.password === "") {
    return;
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");

  redirect("/home/dashboard");
}

// export async function handleloginwithgoogle() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       queryParams: {
//         access_type: "offline",
//         prompt: "consent",
//       },
//       redirectTo: "http://localhost:3000/home",
//     },
//   });
//   console.log(data);
//   if (error) {
//     console.log(error);
//     redirect("/error");
//   }

//   redirect(data.url);
// }
