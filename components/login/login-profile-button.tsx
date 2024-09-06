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
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ChevronDown, IdCard, Settings2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { CustomImage } from "../shared/shared-image";
import { Button } from "../ui/button";

interface LoginProfileButtonProps {
  profileImageUrl?: string;
  username?: string;
  className?: string;
}

const LoginProfileButton: FC<LoginProfileButtonProps> = ({
  profileImageUrl,
  username,
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
          <span className="hidden flex-1 text-left font-semibold md:block">
            설정
          </span>
          <ChevronDown
            className="h-3 w-3 flex-none opacity-50"
            strokeWidth={3}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0 pb-1" align="start">
        {profileImageUrl ? (
          <>
            <div className="inline-flex w-full items-center gap-x-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent">
              <div className="relative mx-auto h-32 overflow-hidden rounded-full ring-border group-hover:ring">
                <CustomImage
                  src={profileImageUrl}
                  alt="Avatar"
                  height={128}
                  width={128}
                  priority
                  className="absolute inset-0 h-full w-full bg-accent object-cover"
                />
              </div>
            </div>
            <DropdownMenuSeparator className="mt-0" />
            <div className="inline-flex w-full items-center gap-x-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent">
              <IdCard strokeWidth={2.5} className="h-5 w-5" />
              <span className="flex-1 text-sm font-semibold">{username}</span>
            </div>
            <DropdownMenuSeparator />
          </>
        ) : null}

        <Link
          href={dashBoardPost.slug || ""}
          className="inline-flex w-full items-center gap-x-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent"
        >
          <dashBoardPost.icon strokeWidth={2.5} className="h-5 w-5" />
          <span className="text-sm font-semibold">{dashBoardPost.title}</span>
        </Link>

        <Link
          href={dashBoardBookMark.slug || ""}
          className="inline-flex w-full items-center gap-x-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent"
        >
          <dashBoardBookMark.icon strokeWidth={2.5} className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {dashBoardBookMark.title}
          </span>
        </Link>

        <Link
          href={dashBoardSettings.slug || ""}
          className="inline-flex w-full items-center gap-x-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent"
        >
          <dashBoardSettings.icon strokeWidth={2.5} className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {dashBoardSettings.title}
          </span>
        </Link>
        <DropdownMenuSeparator />

        <button
          onClick={signOut}
          type="button"
          className="inline-flex w-full items-center gap-x-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent"
        >
          <dashBoardLogout.icon strokeWidth={2.5} className="h-5 w-5" />
          <span className="text-sm font-semibold">{dashBoardLogout.title}</span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginProfileButton;
