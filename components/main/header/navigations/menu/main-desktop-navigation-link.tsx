import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";

interface MainDesktopNavigationLinkProps {
  category: CategoryType
  isActive: boolean
  hoveredCategory: string
  setHoveredCategory: (categoryPathname: string) => void
}

export default function MainDesktopNavigationLink({ category, isActive, hoveredCategory, setHoveredCategory }: MainDesktopNavigationLinkProps) {
  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const categoryPathname = event.currentTarget.getAttribute("data-category-pathname") || '';
    setHoveredCategory(categoryPathname);
  };
  const href = category.slug === "/" ? category.slug : `/category/${category.slug}`
  return (
    <div className="relative" data-category-pathname={category.slug === "/" ? category.slug : `/category/${category.slug}`} onMouseEnter={handleMouseEnter}>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "inline-flex relative z-10 h-auto items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm uppercase tracking-tight antialiased [word-spacing:-5px] hover:bg-transparent",
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
      {hoveredCategory === href && <motion.span className="absolute z-0 inset-0 h-full w-full bg-accent rounded-2xl" layoutId="main-desktop-navigation-menu-background" />}
    </div>
  );
}