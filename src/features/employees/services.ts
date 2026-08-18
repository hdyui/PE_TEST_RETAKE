import { apiClient } from "../../lib/axios";
import type { CreateEmployeeInput, Employee } from "./types";

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await apiClient.get<Employee[]>("/employees");
  return data;
};

export const createEmployee = async (
  body: CreateEmployeeInput,
): Promise<Employee> => {
  const { data } = await apiClient.post<Employee>("/employees", body);
  return data;
};

export const deleteEmployee = async (id: string): Promise<Employee> => {
  const { data } = await apiClient.delete<Employee>(`/employees/${id}`);
  return data;
};
