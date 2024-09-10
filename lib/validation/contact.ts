import * as z from 'zod';

// Email validation schame for newsletter
export const emailSchema = z.object({
    email: z.string().email({ message: '이메일 필수 입력' }),
});

// Contact form validation schema
export const contactFormSchema = z.object({
    name: z.string().min(3, { message: '이름 필수 입력' }),
    email: z.string().email({ message: '이메일 필수 입력' }),
    message: z
        .string()
        .min(4, {
            message: '메시지는 4자 이상이어야 합니다.',
        })
        .max(320, {
            message: '메시지는 320자를 초과할 수 없습니다.',
        }),
});
