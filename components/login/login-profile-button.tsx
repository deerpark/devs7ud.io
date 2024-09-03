"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  dashBoardBookMark,
  dashBoardLogout,
  dashBoardPost,
  dashBoardSettings,
} from "@/config/shared/dashboard";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { ChevronDown, Settings2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "../ui/button";

interface LoginProfileButtonProps {
  profileImageUrl?: string;
  className?: string;
}

const LoginProfileButton: FC<LoginProfileButtonProps> = ({
  profileImageUrl,
  className,
}) => {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex h-auto w-full items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm",
            className,
          )}
        >
          <Settings2 className="h-5 w-5 flex-none" strokeWidth={2.5} />
          <span className="flex-1 text-left">설정</span>
          <ChevronDown className="h-3 w-3 flex-none" strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-sans" align="start">
        {profileImageUrl ? (
          <>
            <div>{profileImageUrl}</div>
            <DropdownMenuSeparator />
          </>
        ) : null}

        <Link
          href={dashBoardPost.slug || ""}
          className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
        >
          <dashBoardPost.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
          <span className="text-sm text-gray-500 group-hover:text-gray-900">
            {dashBoardPost.title}
          </span>
        </Link>

        <Link
          href={dashBoardBookMark.slug || ""}
          className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
        >
          <dashBoardBookMark.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
          <span className="text-sm text-gray-500 group-hover:text-gray-900">
            {dashBoardBookMark.title}
          </span>
        </Link>

        <Link
          href={dashBoardSettings.slug || ""}
          className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
        >
          <dashBoardSettings.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
          <span className="text-sm text-gray-500 group-hover:text-gray-900">
            {dashBoardSettings.title}
          </span>
        </Link>
        <DropdownMenuSeparator />

        <button
          onClick={signOut}
          type="button"
          className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
        >
          <dashBoardLogout.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
          <span className="group-hover:text-gray-90 text-sm text-gray-500">
            {dashBoardLogout.title}
          </span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginProfileButton;
