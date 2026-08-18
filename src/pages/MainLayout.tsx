import { Outlet } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/hook/useAuth";
import { useAuthStore } from "../features/auth/store";

export function MainLayout() {
  const logoutMutation = useLogoutMutation();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span>{user ? `${user.name} (${user.role})` : "Tài khoản"}</span>
        <button onClick={handleLogout} disabled={logoutMutation.isPending}>
          {logoutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
