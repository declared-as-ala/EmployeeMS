import axios from "axios";
import { Employee } from "../types/Employee";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getEmployees(): Promise<Employee[]> {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
}

export async function getEmployeeById(id: number): Promise<Employee> {
  const response = await axios.get(`${API_URL}/employees/${id}`);
  return response.data;
}

export async function createEmployee(employee: Employee): Promise<Employee> {
  const response = await axios.post(`${API_URL}/employees`, employee);
  return response.data;
}

export async function updateEmployee(
  id: number,
  employee: Employee
): Promise<Employee> {
  const response = await axios.put(`${API_URL}/employees/${id}`, employee);
  return response.data;
}
