"use client";

import { buttonVariants } from "@/components/ui/button";
import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

const MainDesktopNavigationMenu = () => {
  const currentPath = usePathname();
  return mainCategoryConfig.map((category) => {
    const isActive =
      currentPath ===
      (category.slug === "/" ? category.slug : `/category/${category.slug}`);
    return (
      <Link
        href={
          category.slug === "/" ? category.slug : `/category/${category.slug}`
        }
        key={v4()}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "inline-flex h-auto items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm uppercase tracking-tight antialiased [word-spacing:-5px]",
          isActive ? "font-black text-primary" : "font-bold",
        )}
      >
        <category.icon
          className={cn(
            "h-5 w-5",
            isActive
              ? "rounded-full bg-primary text-primary-foreground ring-4 ring-primary transition-all"
              : "",
          )}
          strokeWidth={isActive ? 2 : 2.5}
        />
        <span>{category.title}</span>
      </Link>
    );
  });
};

export default MainDesktopNavigationMenu;
