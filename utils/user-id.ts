import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getUserId() {
  const cookeStore = cookies();
  const supabase = createClient(cookeStore);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log("Error has occured while getting UserId!");
    console.log("Error message : ", error.message);
    return null;
  }

  return session ? session.user.id : null;
}