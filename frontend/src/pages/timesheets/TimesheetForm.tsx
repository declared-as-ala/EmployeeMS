import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

// MUI
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

import { Timesheet } from "../../types/Timesheet";
import { Employee } from "../../types/Employee";

import {
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
} from "../../services/timesheetService";
import { getEmployees } from "../../services/employeeService";

const TimesheetForm: React.FC = () => {
  const { id } = useParams(); // if present => edit mode
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  // All employees for the dropdown
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Form data
  const [formData, setFormData] = useState<Partial<Timesheet>>({
    employeeId: 0,
    startTime: "",
    endTime: "",
    summary: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    loadEmployees();
    if (isEditMode && id) {
      loadTimesheet(parseInt(id, 10));
    }
  }, [id]);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees");
    }
  }

  async function loadTimesheet(tsId: number) {
    try {
      const existing = await getTimesheetById(tsId);
      // If the backend returns ISO like "2025-02-08T14:04:00.000Z",
      // Convert it to "YYYY-MM-DDTHH:mm" for <input type="datetime-local" />
      const startLocal = dayjs(existing.startTime).format("YYYY-MM-DDTHH:mm");
      const endLocal = dayjs(existing.endTime).format("YYYY-MM-DDTHH:mm");

      setFormData({
        id: existing.id,
        employeeId: existing.employeeId,
        startTime: startLocal,
        endTime: endLocal,
        summary: existing.summary,
      });
    } catch (err) {
      setError("Failed to load timesheet");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // For MUI's <TextField select> if it's <TextField> with `select`
  // we might cast to HTMLInputElement; or treat it similarly
  function handleSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      employeeId: parseInt(e.target.value, 10),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.employeeId || formData.employeeId <= 0) {
      setError("Please select a valid employee");
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setError("Start and End times are required");
      return;
    }
    // Convert "YYYY-MM-DDTHH:mm" => ISO if your backend expects ISO
    const startISO = dayjs(formData.startTime).toISOString();
    const endISO = dayjs(formData.endTime).toISOString();

    try {
      if (isEditMode && formData.id) {
        // Update
        await updateTimesheet(formData.id, {
          employeeId: formData.employeeId!,
          startTime: startISO,
          endTime: endISO,
          summary: formData.summary || "",
        });
      } else {
        // Create
        await createTimesheet({
          employeeId: formData.employeeId!,
          startTime: startISO,
          endTime: endISO,
          summary: formData.summary || "",
        });
      }
      navigate("/timesheets");
    } catch (err) {
      setError("Failed to save timesheet");
    }
  }

  return (
    <Box sx={{ marginTop: 4, maxWidth: 600 }}>
      <Typography variant="h5" mb={2}>
        {isEditMode ? "Update Timesheet" : "Create Timesheet"}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {/* Employee dropdown */}
        <TextField
          select
          label="Select Employee"
          name="employeeId"
          value={formData.employeeId || 0}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value={0}>-- Select Employee --</MenuItem>
          {employees.map((emp) => (
            <MenuItem key={emp.id} value={emp.id}>
              {emp.name} {/* shows employee name in dropdown */}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          value={formData.startTime || ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="End Time"
          name="endTime"
          type="datetime-local"
          value={formData.endTime || ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="Summary"
          name="summary"
          value={formData.summary || ""}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/timesheets")}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TimesheetForm;
