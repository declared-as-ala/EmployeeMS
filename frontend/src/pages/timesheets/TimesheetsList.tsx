// src/pages/timesheets/TimesheetsList.tsx
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Timesheet } from "../../types/Timesheet";
import { getTimesheets } from "../../services/timesheetService";
import TimesheetCalendar from "./TimesheetCalendar";

function TimesheetsList() {
  const navigate = useNavigate();
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [error, setError] = useState("");

  useEffect(() => {
    loadTimesheets();
  }, []);

  async function loadTimesheets() {
    try {
      const data = await getTimesheets();
      setTimesheets(data);
    } catch (err) {
      setError("Failed to fetch timesheets.");
    }
  }

  // Convert to schedule-x events
  // Format: "YYYY-MM-DD HH:mm"
  const calendarEvents = timesheets.map((ts) => ({
    id: ts.id,
    title: `Timesheet #${ts.id}`,
    start: dayjs(ts.startTime).format("YYYY-MM-DD HH:mm"),
    end: dayjs(ts.endTime).format("YYYY-MM-DD HH:mm"),
  }));

  function handleViewChange(
    _e: React.MouseEvent<HTMLElement>,
    nextView: "table" | "calendar"
  ) {
    if (nextView) {
      setViewMode(nextView);
    }
  }

  function renderTableView() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheets.map((ts) => (
              <TableRow key={ts.id}>
                <TableCell>{ts.id}</TableCell>
                <TableCell>{ts.employeeId}</TableCell>
                <TableCell>{ts.startTime}</TableCell>
                <TableCell>{ts.endTime}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => navigate(`/timesheets/${ts.id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {timesheets.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>No timesheets found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Timesheets
      </Typography>

      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        {/* “Add Timesheet” -> /timesheets/new => TimesheetForm in create mode */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/timesheets/new")}
        >
          Create New Timesheet
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/employees")}
        >
          View Employees
        </Button>
      </Box>

      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewChange}
        sx={{ marginBottom: 2 }}
      >
        <ToggleButton value="table">Table View</ToggleButton>
        <ToggleButton value="calendar">Calendar View</ToggleButton>
      </ToggleButtonGroup>

      {viewMode === "table" ? (
        renderTableView()
      ) : (
        <TimesheetCalendar events={calendarEvents} />
      )}
    </Box>
  );
}

export default TimesheetsList;
