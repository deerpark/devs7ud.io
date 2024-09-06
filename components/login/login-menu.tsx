"use client";

import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/collection";
import * as React from "react";
import LoginButton from "./login-button";
import LoginProfileButton from "./login-profile-button";

export const revalidate = 30;

const LoginMenu = ({ userId }: { userId: string | null }) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  const [username, setUserName] = React.useState<string>("");

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
        setUserName(data.username ? data.username : "");
      }
    }
    fetchAvatar();
  }, [userId, supabase]);

  return (
    <>
      {userId ? (
        <LoginProfileButton profileImageUrl={avatarUrl} username={username} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
