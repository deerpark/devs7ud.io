"use client";

import { LoginMenu } from "@/components/login";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LogoIcon } from "@/icons";
import * as React from "react";
import { MainMobileMenuButton, MainMobileNavigationMenu } from "./menu";

const MainMobileNavigation = ({ userId }: { userId: string | null }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="flex max-w-full items-center justify-between bg-background px-3 py-4 md:hidden">
      {/* Mobile Menu Button */}
      <div className="flex flex-none justify-end">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              className="flex items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm"
            >
              <MainMobileMenuButton open={open} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="hidden items-center justify-center pb-0 pt-5">
                <span className="rounded-full bg-background/0 p-3">
                  <LogoIcon
                    className="h-8 w-8"
                    pathClassName="fill-background stroke-foreground/80"
                    strokeWidth={1}
                  />
                </span>
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                메뉴를 탐색 하세요.
              </DrawerDescription>
            </DrawerHeader>
            <MainMobileNavigationMenu onClose={setOpen} />
          </DrawerContent>
        </Drawer>
      </div>

      <span className="flex-1" />

      {/* Login */}
      <div className="flex-none">
        <LoginMenu userId={userId} />
      </div>
    </nav>
  );
};

export default MainMobileNavigation;
