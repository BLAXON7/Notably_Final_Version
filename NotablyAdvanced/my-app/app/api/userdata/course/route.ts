import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { course, userId } = await request.json();

  if (!course || !userId) {
    return NextResponse.json(
      { error: "Course and userId are required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("User")
    .update({ Course: course })
    .eq("id", userId);

  if (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, course });
}
