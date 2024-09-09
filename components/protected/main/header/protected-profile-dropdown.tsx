"use client";

import { CustomImage } from "@/components/shared/shared-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashBoardLogout, dashBoardProfile } from "@/config/shared/dashboard";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { shimmer, toBase64 } from "@/lib/utils";
import { Profile } from "@/types/collection";
import Link from "next/link";
import * as React from "react";

const ProtectedProfileDropDown = () => {
  const supabase = createClient();
  const { user, loading, signOut } = useAuth();
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomImage
            src={avatarUrl || "/images/user-placeholder.png"}
            alt="Avatar"
            height={40}
            width={40}
            className="h-[40px] w-[40px] rounded-full"
            priority
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(40, 40),
            )}`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans">
          <Link
            href={dashBoardProfile.slug || ""}
            className="group inline-flex w-full items-center rounded-md bg-background px-3 py-2.5 hover:bg-accent"
          >
            <dashBoardProfile.icon className="mr-2 h-4 w-4 group-hover:text-primary" />
            <span className="text-sm group-hover:text-primary">
              {dashBoardProfile.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <button
            onClick={signOut}
            type="button"
            className="group inline-flex w-full items-center rounded-md bg-background px-3 py-2.5 hover:bg-accent"
          >
            <dashBoardLogout.icon className="mr-2 h-4 w-4 group-hover:text-primary" />
            <span className="text-sm group-hover:text-primary group-hover:text-primary">
              {dashBoardLogout.title}
            </span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProtectedProfileDropDown;
