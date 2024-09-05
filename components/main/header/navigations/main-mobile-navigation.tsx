"use client";

import { LoginMenu } from "@/components/login";
import { Disclosure } from "@headlessui/react";
import React, { Fragment } from "react";
import { MainMobileMenuButton, MainMobileNavigationMenu } from "./menu";

const MainMobileNavigation = ({ userId }: { userId: string | null }) => {
  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          <nav className="flex max-w-full items-center justify-between px-3 py-4 md:hidden">
            {/* Mobile Menu Button */}
            <div className="flex flex-none justify-end">
              <MainMobileMenuButton open={open} />
            </div>

            <span className="flex-1" />

            {/* Login */}
            <div className="flex-none">
              <LoginMenu userId={userId} />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <MainMobileNavigationMenu fragment={Fragment} close={close} />
        </>
      )}
    </Disclosure>
  );
};

export default MainMobileNavigation;
