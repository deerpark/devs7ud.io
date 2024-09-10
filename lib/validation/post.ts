import z from "zod";

export const postDeleteSchema = z.object({
  id: z.string(),
  user_id: z.string(),
});

export const postSlugSchema = z.object({
  slug: z.string(),
});

export const postCreateSchema = z.object({
  title: z.string(),
  user_id: z.string(),
});

export const postParamSchema = z.object({
  postId: z.string(),
  userId: z.string(),
});

export const postEditFormContentSchema = z.object({
  content: z.any().optional(),
});

export const postEditFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "제목은 2자 이상이어야 합니다.",
    })
    .max(120, {
      message: "제목은 120자를 넘지 않아야 합니다.",
    }),
  slug: z
    .string()
    .min(2, {
      message: "슬러그는 2자 이상이어야 합니다.",
    })
    .max(100, {
      message: "슬러그는 100자를 넘지 않아야 합니다.",
    }),
  categoryId: z.string({
    required_error: "카테고리를 선택하세요.",
  }),
  image: z.string().optional(),
  description: z
    .string()
    .min(2, {
      message: "설명은 2자 이상이어야 합니다.",
    })
    .max(300, {
      message: "설명은 300자를 넘지 않아야 합니다.",
    }),
  content: z.any().optional(),
  published: z.boolean(),
  focus: z.boolean(),
});

export const postUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  categoryId: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  content: z.any().optional(),
  published: z.boolean(),
  focus: z.boolean(),
});
