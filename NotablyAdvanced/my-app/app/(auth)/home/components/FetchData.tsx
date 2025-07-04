"use server";

import { createClient } from "@/app/utils/supabase/server";

export const getSession = async () => {
  const supabase = createClient();

  return await supabase.auth.getSession();
};


