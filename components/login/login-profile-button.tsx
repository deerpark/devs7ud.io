"use client";

import {
  dashBoardBookMark,
  dashBoardLogout,
  dashBoardPost,
  dashBoardSettings,
  dashBoardThemes,
} from "@/config/shared/dashboard";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ChevronDown, IdCard, Settings2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { CustomImage } from "../shared/shared-image";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";

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
  const { theme, setTheme } = useTheme();
  const currentTheme = dashBoardThemes.subMenu?.find((t) => t.slug === theme);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <Menubar className="h-auto w-full border-0 bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger asChild>
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
        </MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            {/* {profileImageUrl ? (
              <>
                <MenubarItem className="group py-3">
                  <div className="relative mx-auto h-32 overflow-hidden rounded-full ring-border group-hover:ring-1">
                    <CustomImage
                      src={profileImageUrl}
                      alt="Avatar"
                      height={128}
                      width={128}
                      priority
                      className="absolute inset-0 h-full w-full bg-accent object-cover"
                    />
                  </div>
                </MenubarItem>
                <MenubarSeparator className="mt-0" />
              </>
            ) : null} */}
            <MenubarItem
              className="flex items-center gap-x-4"
              onSelect={() => {
                router.push(dashBoardSettings.slug || "");
              }}
            >
              <IdCard className="h-4 w-4" />
              <span className="flex-1 truncate">{username}</span>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem
              className="flex items-center gap-x-4"
              onSelect={() => {
                router.push(dashBoardPost.slug || "");
              }}
            >
              <dashBoardPost.icon className="h-4 w-4" />
              <span className="flex-1 truncate">{dashBoardPost.title}</span>
            </MenubarItem>
            <MenubarItem
              className="flex items-center gap-x-4"
              onSelect={() => {
                router.push(dashBoardBookMark.slug || "");
              }}
            >
              <dashBoardBookMark.icon className="h-4 w-4" />
              <span className="flex-1 truncate">{dashBoardBookMark.title}</span>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger className="flex items-center gap-x-4">
              {currentTheme ? (
                <currentTheme.icon className="h-4 w-4" />
              ) : (
                <dashBoardThemes.icon className="h-4 w-4" />
              )}
              <span className="flex-1 truncate">{dashBoardThemes.title}</span>
              {currentTheme ? (
                <MenubarShortcut className="rounded-sm border border-border/50 bg-accent/50 px-1 font-sans text-xs tracking-tight">
                  {currentTheme.title}
                </MenubarShortcut>
              ) : null}
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup
                value={theme}
                onValueChange={(value) => {
                  setTheme(value);
                }}
              >
                {dashBoardThemes.subMenu?.map((t) => (
                  <MenubarRadioItem
                    className={cn(
                      "flex items-center gap-x-4",
                      t.slug === theme ? "bg-accent/50" : "text-foreground/70",
                    )}
                    value={t.slug!}
                    key={t.slug}
                  >
                    <t.icon className="h-4 w-4" />
                    <span
                      className={cn(
                        "flex-1 truncate",
                        t.slug === theme ? "font-bold" : "",
                      )}
                    >
                      {t.title}
                    </span>
                  </MenubarRadioItem>
                ))}
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem className="flex items-center gap-x-4" onSelect={signOut}>
            <dashBoardLogout.icon className="h-4 w-4" />
            <span className="flex-1 truncate">{dashBoardLogout.title}</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default LoginProfileButton;
