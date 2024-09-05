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
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-2.5 hover:bg-gray-100"
          >
            <dashBoardProfile.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardProfile.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <button
            onClick={signOut}
            type="button"
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-2.5 hover:bg-gray-100"
          >
            <dashBoardLogout.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="group-hover:text-gray-90 text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardLogout.title}
            </span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProtectedProfileDropDown;
