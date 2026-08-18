export interface Employee {
  id: string;
  fullName: string;
  department: string;
  gender: string;
}

export type CreateEmployeeInput = Omit<Employee, "id">;
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;
