"use server";
import { createClient } from "@/app/utils/supabase/server";

export const handleImageBucket = async (
  url: string,
  file: File,
  id: number
) => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw userError || new Error("User not authenticated");
  }

  try {
    // Create a unique filename that includes the note ID and timestamp
    const timestamp = new Date().getTime();
    const sanitizedFileName = url.split(/[\/\\]/).pop() || url;
    const filePath = `${user.id}/${id}_${timestamp}_${sanitizedFileName}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload the file
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    // Update the Notes table with the new image URL
    const { error: updateError } = await supabase
      .from("Notes")
      .update({ Image: publicUrlData.publicUrl })
      .eq("id", id);

    if (updateError) {
      console.error("Update error:", updateError);
      // If update fails, try to clean up the uploaded file
      await supabase.storage.from("images").remove([filePath]);
      throw updateError;
    }

    return { data, publicUrl: publicUrlData.publicUrl };
  } catch (error) {
    console.error("Error in handleImageBucket:", error);
    throw error;
  }
};
