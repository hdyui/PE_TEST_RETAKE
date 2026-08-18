import { employeeSchema, type EmployeeFormData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateEmployees } from "../hooks/Employees";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeesCreatepage() {
  const navigate = useNavigate();
  const createMutation = useCreateEmployees();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    mode: "onTouched",
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullName: "",
      department: "",
      gender: "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await createMutation.mutateAsync(data);
      navigate("/employees", {
        replace: true,
        state: { message: "Thêm nhân viên thành công." },
      });
    } catch {
      return;
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Thêm nhân viên</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="fullName">Họ tên</label>
          <input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <p role="alert" style={{ color: "crimson" }}>
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="department">Phòng ban / Vị trí</label>
          <input id="department" {...register("department")} />
          {errors.department && (
            <p role="alert" style={{ color: "crimson" }}>
              {errors.department.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="gender">Giới tính</label>
          <input id="gender" {...register("gender")} />
          {errors.gender && (
            <p role="alert" style={{ color: "crimson" }}>
              {errors.gender.message}
            </p>
          )}
        </div>
        {createMutation.isError && (
          <p role="alert" style={{ color: "crimson" }}>
            Không thể thêm nhân viên. Vui lòng thử lại.
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || createMutation.isPending}
        >
          {createMutation.isPending ? "Đang lưu..." : "Lưu nhân viên"}
        </button>{" "}
        <Link to="/employees">Hủy</Link>
      </form>
    </div>
  );
}
