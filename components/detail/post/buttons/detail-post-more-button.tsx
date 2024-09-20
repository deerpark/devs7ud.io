"use client";

import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categoryIcons } from "@/config/main/main-category-config";
import { categories } from "@/config/shared/shared-categories";
import { Post } from "@/types/collection";
import { format, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";
import { Captions, Clock, Ellipsis } from "lucide-react";
import * as React from "react";

const DetailPostMoreButton = ({ post }: { post: Post }) => {
  const category = categories.find(
    (category) => category.id === post.category_id,
  );
  const date = format(parseISO(post.created_at!), "yyyy년 MM월 dd일", {
    locale: ko,
  });
  return (
    <Menubar className="h-auto w-full border-0 bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <div className="!p-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Ellipsis size={16} strokeWidth={3} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-1 py-0.5 text-xs font-semibold text-muted-foreground">
                추가 정보
              </TooltipContent>
            </Tooltip>
          </div>
        </MenubarTrigger>
        <MenubarContent className="font-semibold text-muted-foreground">
          <MenubarGroup>
            <MenubarItem className="flex items-center gap-x-4">
              <Captions className="h-4 w-4" />
              <span className="flex-1 truncate">{post.title}</span>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            {category ? (
              <MenubarItem className="flex items-center gap-x-4">
                {React.createElement(categoryIcons[category.slug], {
                  className: "h-4 w-4",
                })}
                <span className="flex-1 truncate">{category.title}</span>
              </MenubarItem>
            ) : null}
            <MenubarItem className="flex items-center gap-x-4">
              <Clock className="h-4 w-4" />
              <span className="flex-1 truncate">{date}</span>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default DetailPostMoreButton;
