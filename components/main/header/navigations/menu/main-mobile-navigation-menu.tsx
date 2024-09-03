"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExoticComponent, FC, ReactNode } from "react";
import { v4 } from "uuid";

interface MainMobileNavigationMenuProps {
  fragment: ExoticComponent<{
    children?: ReactNode | undefined;
  }>;
}

const MainMobileNavigationMenu: FC<MainMobileNavigationMenuProps> = ({
  fragment,
}) => {
  const router = useRouter();

  return (
    <>
      <Transition
        as={fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Disclosure.Panel className="w-full border-t bg-background pt-5 lg:hidden">
          {mainCategoryConfig.map((category) => (
            <Link
              key={v4()}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex w-full items-center gap-x-6 rounded-none px-10 font-semibold",
              )}
              href={
                category.slug === "/"
                  ? category.slug
                  : `/category/${category.slug}`
              }
            >
              <category.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{category.title}</span>
            </Link>
          ))}
        </Disclosure.Panel>
      </Transition>
    </>
  );
};

export default MainMobileNavigationMenu;
