import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../features/auth/hook/useAuth";
import { LoginSchema, type LoginSchemaType } from "../features/auth/schema";

export function LoginPage() {
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch {
      return;
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              {...register("email")}
              style={{ width: "100%", padding: 8 }}
            />
            {errors.email && (
              <p style={{ color: "crimson" }}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              style={{ width: "100%", padding: 8 }}
            />
            {errors.password && (
              <p style={{ color: "crimson" }}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
          {loginMutation.isError && (
            <p role="alert" style={{ color: "crimson" }}>
              Đăng nhập thất bại. Vui lòng kiểm tra kết nối API và thử lại.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
