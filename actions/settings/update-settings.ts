"use server";

import { profileSchema } from "@/lib/validation/profile";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function UpdateSettings(context: z.infer<typeof profileSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const profile = profileSchema.parse(context);
    
    if(!profile.id) throw new Error("no exist id");
    
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: `${profile.fistName} ${profile.lastName}`,
        username: profile.userName,
        avatar_url: profile.avatarUrl,
        website: profile.website,
      })
      .eq("id", profile.id);

    if (error) {
      handleServerError(error.message);
      return false;
    }
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      handleServerError(error.message);
      return false;
    }
    return false;
  }
}
