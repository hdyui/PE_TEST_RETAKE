import z from "Zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email can not empty!!!").max(100, "Email to long!"),
  password: z
    .string()
    .min(6, "Password must more than or equal with 6 character!")
    .max(100, "Password to long!"),
});

export type loginSchemaType = z.infer<typeof LoginSchema>;
