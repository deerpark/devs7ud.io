"use client";

import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/collection";
import { User } from "@supabase/supabase-js";
import * as React from "react";
import LoginButton from "./login-button";
import LoginProfileButton from "./login-profile-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginMenu = ({ userId }: { userId: string | null }) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchAvatar() {
      if (!userId) {
        return Promise.resolve();
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ id: userId })
        .single<Profile>();
      if (error) {
        console.error(error);
      }
      if (data) {
        setAvatarUrl(data.avatar_url ? data.avatar_url : "");
      }
    }
    fetchAvatar();
  }, [userId, supabase]);

  return (
    <>
      {userId ? (
        <LoginProfileButton profileImageUrl={avatarUrl} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
