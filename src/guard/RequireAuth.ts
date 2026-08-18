import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store";

export function RequireAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  return React.createElement(Outlet);
}

export function RequireUnAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return React.createElement(Navigate, { to: "/employees", replace: true });
  }

  return React.createElement(Outlet);
}
