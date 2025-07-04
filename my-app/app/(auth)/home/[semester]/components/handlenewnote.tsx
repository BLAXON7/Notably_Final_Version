"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const handleeditnote = async (
  noteId: number,
  title: string,
  description: string,
  userId: number,
) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("Notes")
      .update({
        title: title.trim(),
        description: description.trim(),
      })
      .eq("id", noteId)
      .eq("user_id", userId); // Extra security check

    if (error) {
      console.log("Error updating note:", error.message);
      throw new Error("Failed to update note");
    }

    return true;
  } catch (error) {
    console.error("Error in handleeditnote:", error);
    redirect("/error");
  }
};

export const handlenewnote = async (
  id: number,
  title: string,
  description: string,
  Semester: number,

  Notecounts: number
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Notes")
    .insert({ user_id: id, title, description,Semester })
    .select()
    .single();

  if (error) {
    console.log(error.message);
    redirect("/error");
  }

  const { error: updateerror } = await supabase
    .from("User")
    .update({ Notecount: Number(Notecounts) + 1 })
    .eq("id", id);

  if (updateerror) {
    console.log(updateerror);
    redirect("/error");
  }

  return { success: true, noteId: data.id };
};

export const getdata = async (id: string) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("Notes")
    .select("id,title,description,Image,Semester")
    .eq("id", id)
    .single();

  return data;
};
export const deletenotecount = async (id: number, Notecounts: number) => {
  const supabase = createClient();

  const {} = await supabase
    .from("User")
    .update({ Notecount: Number(Notecounts) - 1 })
    .eq("id", id);
};
