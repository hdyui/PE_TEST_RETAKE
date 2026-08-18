import { createBrowserRouter, Navigate } from "react-router-dom";
import { RequireAuth, RequireUnAuth } from "../src/guard/RequireAuth";
import { EmployeesPage } from "../src/features/employees/pages/EmployeesPage";
import { MainLayout } from "../src/pages/MainLayout";
import { LoginPage } from "../src/pages/LoginPage";
import EmployeesCreatepage from "../src/features/employees/pages/EmployeesCreatepage";

export const router = createBrowserRouter([
  {
    element: <RequireUnAuth />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/employees" replace /> },
          { path: "employees", element: <EmployeesPage /> },
          { path: "employees/create", element: <EmployeesCreatepage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
