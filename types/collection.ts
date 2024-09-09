import { Database } from "./supabase";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Author = Database["public"]["Tables"]["authors"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type BookMark = Database["public"]["Tables"]["bookmarks"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Draft = Database["public"]["Tables"]["drafts"]["Row"];

export interface DraftWithCategory extends Omit<Draft, "categories"> {
  categories: Category;
}

export interface DraftWithCategoryWithProfile
  extends Omit<DraftWithCategory, "profiles"> {
  profiles: Profile;
}

export interface PostWithCategory extends Omit<Post, "categories"> {
  categories: Category;
}

export interface PostWithCategoryWithProfile
  extends Omit<PostWithCategory, "profiles"> {
  profiles: Profile;
}

export interface FocusPostWithCategory {
  post_id: string;
  post_title: string;
  post_description: string;
  post_image: string;
  category_id: string | null;
  category_title: string | null;
}

export interface CategoryWithPost extends Omit<Category, "posts"> {
  posts: Post;
}

export interface BookMarkWithPost extends Omit<BookMark, "posts"> {
  posts: Post;
}

export interface CommentWithProfile extends Omit<Comment, "profiles"> {
  profiles: Profile;
}
