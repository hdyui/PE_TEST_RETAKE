import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEmployee, deleteEmployee, getEmployees } from "../services";
import type { CreateEmployeeInput } from "../types";

export const employeesQueryKey = ["employees"] as const;

export const useGetEmployees = () => {
  return useQuery({
    queryKey: employeesQueryKey,
    queryFn: getEmployees,
  });
};
export const useCreateEmployees = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateEmployeeInput) => createEmployee(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: employeesQueryKey }),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: employeesQueryKey }),
  });
};
