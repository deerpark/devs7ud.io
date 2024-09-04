"use client";

import { buttonVariants } from "@/components/ui/button";
import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const MainDesktopNavigationMenu = () => {
  const currentPath = usePathname();
  const [hoveredCategory, setHoveredCategory] = React.useState(currentPath);
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const categoryPathname =
      event.currentTarget.getAttribute("data-category-pathname") || "";
    setHoveredCategory(categoryPathname);
  };
  const handleMouseLeave = () => {
    setHoveredCategory(currentPath);
  };
  return (
    <div className="flex flex-none flex-col" onMouseLeave={handleMouseLeave}>
      {mainCategoryConfig.map((category) => {
        const isActive =
          currentPath ===
          (category.slug === "/"
            ? category.slug
            : `/category/${category.slug}`);
        const pathname =
          category.slug === "/" ? category.slug : `/category/${category.slug}`;
        return (
          <div
            key={category.slug}
            className="relative"
            data-category-pathname={pathname}
            onMouseEnter={handleMouseEnter}
          >
            <Link
              href={pathname}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "relative z-10 flex h-auto items-center justify-start gap-x-2 rounded-3xl px-3 py-3 text-sm uppercase tracking-tight antialiased [word-spacing:-5px] hover:bg-transparent",
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
            {hoveredCategory === pathname && (
              <motion.span
                className="pointer-events-none absolute left-0 right-0 top-1 z-0 h-9 w-full rounded-2xl bg-accent"
                layoutId="navigation-hover-background"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MainDesktopNavigationMenu;
