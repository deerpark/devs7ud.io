"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import { Disclosure, Transition } from "@headlessui/react";
import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExoticComponent, FC, ReactNode } from "react";
import { v4 } from "uuid";

interface MainMobileNavigationMenuProps {
  fragment: ExoticComponent<{
    children?: ReactNode | undefined;
  }>;
  close: (
    focusableElement?:
      | HTMLElement
      | React.MutableRefObject<HTMLElement | null>
      | undefined,
  ) => void;
}

const MainMobileNavigationMenu: FC<MainMobileNavigationMenuProps> = ({
  fragment,
  close,
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
        <Disclosure.Panel className="mb-2 w-full border-y bg-background py-5 md:hidden">
          <Link
            key={v4()}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex h-auto w-full items-center gap-x-2 rounded-none px-6 py-3 font-semibold",
            )}
            href="/"
            onClick={() => close()}
          >
            <Home className="h-5 w-5" strokeWidth={2.5} />
            <span className="flex-1 text-left">홈</span>
          </Link>
          {mainCategoryConfig.map((category) => (
            <Link
              key={v4()}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex h-auto w-full items-center gap-x-2 rounded-none px-6 py-3 font-semibold",
              )}
              onClick={() => close()}
              href={
                category.slug === "/"
                  ? category.slug
                  : `/category/${category.slug}`
              }
            >
              <category.icon className="h-5 w-5" strokeWidth={2.5} />
              <span className="flex-1 text-left">{category.title}</span>
            </Link>
          ))}
        </Disclosure.Panel>
      </Transition>
    </>
  );
};

export default MainMobileNavigationMenu;
