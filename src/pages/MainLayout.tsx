import React from "react";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <div className="w-10 h-10 bg-blue">Welcom</div>
      <Outlet />
    </div>
  );
}
