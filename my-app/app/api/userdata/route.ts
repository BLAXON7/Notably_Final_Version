import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: userdata, error } = await supabase
    .from("User")
    .select("id, Email, Notecount,Course")
    .eq("id", authData.user.id)
    .single();

    console.log(userdata?.Course ,"get function");

    
  if (error || !userdata) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const safeData = {
    ...userdata,
    Notecount: userdata.Notecount.toString(), // if needed
  };

  return NextResponse.json(safeData);
}
