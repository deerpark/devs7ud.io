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

const LoginMenu = () => {
  const supabase = createClient();
  const { user, loading } = useAuth();
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchAvatar() {
      if (!user?.id) {
        return Promise.resolve();
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ id: user?.id })
        .single<Profile>();
      if (error) {
        console.error(error);
      }
      if (data) {
        setAvatarUrl(data.avatar_url ? data.avatar_url : "");
      }
    }
    fetchAvatar();
  }, [user, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? (
        <LoginProfileButton profileImageUrl={avatarUrl} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
