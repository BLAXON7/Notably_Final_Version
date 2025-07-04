"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const handlenoteboxdata = async (id: number,Semester:number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Notes")
    .select("id,title,description,Image,Semester")
    .eq("user_id", id).eq("Semester",Semester);

  if (error) {
    console.log(error.message);
    redirect("/error");
  }
  return data;
};

export const handledeletenote = async (
  id: number,
  noteid: number,
  Notecounts: number
) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("Notes")
    .delete()
    .match({ id: noteid, user_id: id });

  if (error) {
    console.log(error.message);
    redirect("/error");
  }
  const { error: updateerror } = await supabase
    .from("User")
    .update({ Notecount: Number(Notecounts) - 1 })
    .eq("user_id", id);

  if (error) {
    console.log(updateerror);
    redirect("/error");
  }
  return true;
};
