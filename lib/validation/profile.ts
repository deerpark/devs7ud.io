import * as z from "zod";

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "이름은 2자 이상이어야 합니다.",
    })
    .max(30, {
      message: "이름은 30자를 넘지 않아야 합니다.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "성은 2자 이상이어야 합니다.",
    })
    .max(30, {
      message: "성은 30자를 넘지 않아야 합니다.",
    }),
  userName: z.string().optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
  website: z.string().optional(),
});

export const profileSchema = z.object({
  id: z.string(),
  fistName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  userName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  website: z.string().optional(),
});
