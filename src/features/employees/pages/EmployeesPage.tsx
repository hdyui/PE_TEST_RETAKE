import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDeleteEmployee, useGetEmployees } from "../hooks/Employees";

export function EmployeesPage() {
  const { data: employees = [], isLoading, isError, error } = useGetEmployees();
  const deleteMutation = useDeleteEmployee();
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(
    (location.state as { message?: string } | null)?.message ?? null,
  );

  const handleDelete = (id: string, fullName: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa ${fullName}?`)) return;

    deleteMutation.mutate(id, {
      onSuccess: () => setMessage("Xóa nhân viên thành công."),
      onError: () => setMessage("Không thể xóa nhân viên. Vui lòng thử lại."),
    });
  };

  if (isLoading) {
    return <div role="status">Đang tải danh sách nhân viên...</div>;
  }

  if (isError) {
    return (
      <div role="alert">
        Không thể tải danh sách nhân viên: {error.message}
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Danh sách nhân viên</h1>
        <Link to="/employees/create">Create New</Link>
      </div>

      {message && <p role="status">{message}</p>}

      {employees.length === 0 ? (
        <p>Chưa có nhân viên.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Phòng ban</th>
              <th>Giới tính</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.fullName}</td>
                <td>{employee.department}</td>
                <td>{employee.gender}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(employee.id, employee.fullName)}
                    disabled={
                      deleteMutation.isPending && deleteMutation.variables === employee.id
                    }
                  >
                    {deleteMutation.isPending && deleteMutation.variables === employee.id
                      ? "Đang xóa..."
                      : "Xóa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
