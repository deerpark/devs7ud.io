"use client";

import { LoginMenu } from "@/components/login";
import { Disclosure } from "@headlessui/react";
import React, { Fragment } from "react";
import { MainMobileMenuButton, MainMobileNavigationMenu } from "./menu";

const MainMobileNavigation = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <nav className="flex max-w-full items-center justify-between bg-background/50 px-6 py-4 shadow-2xl shadow-foreground/10 backdrop-blur-sm md:hidden">
            {/* Mobile Menu Button */}
            <div className="flex flex-none justify-end">
              <MainMobileMenuButton open={open} />
            </div>

            <span className="flex-1" />

            {/* Login */}
            <div className="flex-none">
              <LoginMenu />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <MainMobileNavigationMenu fragment={Fragment} />
        </>
      )}
    </Disclosure>
  );
};

export default MainMobileNavigation;
