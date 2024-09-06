"use client";

import { buttonVariants } from "@/components/ui/button";
import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

interface MainMobileNavigationMenuProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainMobileNavigationMenu: React.FC<MainMobileNavigationMenuProps> = ({
  onClose,
}) => {
  const router = useRouter();

  return (
    <div className="mb-2 w-full flex-1 pb-5 md:hidden">
      <Link
        key={v4()}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex h-auto w-full items-center gap-x-6 rounded-none px-6 py-3 font-semibold",
        )}
        href="/"
        onClick={() => onClose(false)}
      >
        <Home className="h-7 w-7" strokeWidth={1} />
        <span className="flex-1 text-left">홈</span>
      </Link>
      {mainCategoryConfig.map((category) => (
        <Link
          key={v4()}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex h-auto w-full items-center gap-x-6 rounded-none px-6 py-3 font-semibold",
          )}
          onClick={() => onClose(false)}
          href={
            category.slug === "/" ? category.slug : `/category/${category.slug}`
          }
        >
          <category.icon className="h-7 w-7" strokeWidth={1} />
          <span className="flex-1 text-left">{category.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default MainMobileNavigationMenu;
