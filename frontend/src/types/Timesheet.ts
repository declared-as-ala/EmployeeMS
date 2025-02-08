// src/types/Timesheet.ts
export interface Timesheet {
  id?: number;

  employeeId: number;
  startTime: string; // e.g. '2025-02-09T15:18:00.000Z'
  endTime: string;
  summary?: string;
}
