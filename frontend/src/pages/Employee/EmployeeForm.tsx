// src/pages/employees/EmployeeForm.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Employee } from "../../types/Employee";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import { toast } from "react-toastify";

// Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<Employee>({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode && id) {
      fetchEmployee(parseInt(id, 10));
    }
  }, [id]);

  async function fetchEmployee(empId: number) {
    try {
      const data = await getEmployeeById(empId);
      setFormData(data);
    } catch (err) {
      setError("Failed to load employee data.");
      toast.error("Could not load employee");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.name) {
      setError("Name is required.");
      toast.error("Name is required.");
      return;
    }

    try {
      if (isEditMode && id) {
        await updateEmployee(parseInt(id, 10), formData);
        toast.success("Employee updated successfully!");
      } else {
        await createEmployee(formData);
        toast.success("Employee created successfully!");
      }
      navigate("/employees");
    } catch (err) {
      setError("Failed to save employee.");
      toast.error("Failed to save employee.");
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 4 }}>
      <Typography variant="h5" mb={2}>
        {isEditMode ? "Update Employee" : "Create Employee"}
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <TextField
        label="Name*"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email || ""}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle || ""}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Department"
        name="department"
        value={formData.department || ""}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate || ""}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="End Date"
        name="endDate"
        type="date"
        value={formData.endDate || ""}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default EmployeeForm;
