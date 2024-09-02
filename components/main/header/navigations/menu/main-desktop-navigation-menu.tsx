"use client";

import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

const MainDesktopNavigationMenu = () => {
  const currentPath = usePathname();
  return (
    <>
      <div className="hidden gap-x-4 md:flex">
        {mainCategoryConfig.map((category) => (
          <Link
            href={
              category.slug === "/"
                ? category.slug
                : `/category/${category.slug}`
            }
            key={v4()}
            className={cn(
              "relative inline-flex items-center px-3 py-1.5 text-sm uppercase tracking-tight antialiased [word-spacing:-5px]",
              {
                "font-black text-primary":
                  currentPath ===
                  (category.slug === "/"
                    ? category.slug
                    : `/category/${category.slug}`),
              },
              {
                "font-bold text-foreground hover:text-primary":
                  currentPath !==
                  (category.slug === "/"
                    ? category.slug
                    : `/category/${category.slug}`),
              },
            )}
          >
            <div className="relative">{category.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MainDesktopNavigationMenu;
