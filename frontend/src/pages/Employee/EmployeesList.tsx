// src/pages/employees/EmployeesList.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Employee } from "../../types/Employee";
import { getEmployees } from "../../services/employeeService";

// Material UI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Toastify
import { toast } from "react-toastify";

function EmployeesList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data); // initially show all
    } catch (err) {
      setError("Failed to fetch employees.");
      toast.error("Could not load employees");
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setSearchText(text);
    if (!text) {
      setFilteredEmployees(employees);
      return;
    }
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/employees/new"
        >
          Create New Employee
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/timesheets"
        >
          View Timesheets
        </Button>
      </div>

      {/* Search Bar */}
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.jobTitle}</TableCell>
                <TableCell>{emp.startDate}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    component={Link}
                    to={`/employees/${emp.id}`}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>No employees found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeesList;
