import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email không được để trống.").email("Email không hợp lệ."),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(100, "Mật khẩu không được quá 100 ký tự."),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
