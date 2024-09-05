import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export async function getUserId() {
  const cookeStore = cookies();
  const supabase = createClient(cookeStore);
  const {
      data: { user },
    } = await supabase.auth.getUser();

  return user ? user.id : null;
}