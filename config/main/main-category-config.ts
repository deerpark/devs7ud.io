import { CategoryType } from "@/types";
import { categories } from "../shared/shared-categories";
import { Film, LibraryBig, Lightbulb, Mailbox, Sparkles, BrickWall, Pickaxe } from "lucide-react";

export const categoryIcons = {
  news: Mailbox,
  components: BrickWall,
  mods: Sparkles,
  inspire: Lightbulb,
  interaction: Film,
  references: LibraryBig,
  works: Pickaxe,
}

const mainCategoryConfig: CategoryType[] = categories.map(category => ({
    id: category.id,
    title: category.title,
    slug: category.slug,
    icon: categoryIcons[category.slug],
  }));

export default mainCategoryConfig;
