import { z } from "zod";

export const employeeSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên phải có ít nhất 2 ký tự."),
  department: z.string().trim().min(1, "Phòng ban không được để trống."),
  gender: z.string().trim().min(1, "Giới tính không được để trống."),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
