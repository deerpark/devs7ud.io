import * as z from 'zod';

export const commentSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    comment: z.string(),
});

export const commentDeleteSchema = z.object({
    id: z.string(),
    userId: z.string(),
});

export const commentFormSchema = z.object({
    comment: z
        .string()
        .min(3, { message: '댓글은 3자 이상이어야 합니다.' })
        .max(500, { message: '댓글은 최대 500자 이내로 작성해야 합니다.' }),
});
