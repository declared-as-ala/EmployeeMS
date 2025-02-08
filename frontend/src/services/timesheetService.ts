import axios from "axios";
import { Timesheet } from "../types/Timesheet";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getTimesheets(): Promise<Timesheet[]> {
  const response = await axios.get(`${API_URL}/timesheets`);
  return response.data;
}

export async function getTimesheetById(id: number): Promise<Timesheet> {
  const response = await axios.get(`${API_URL}/timesheets/${id}`);
  return response.data;
}

export async function createTimesheet(
  timesheet: Timesheet
): Promise<Timesheet> {
  const response = await axios.post(`${API_URL}/timesheets`, timesheet);
  return response.data;
}

export async function updateTimesheet(
  id: number,
  timesheet: Timesheet
): Promise<Timesheet> {
  const response = await axios.put(`${API_URL}/timesheets/${id}`, timesheet);
  return response.data;
}
