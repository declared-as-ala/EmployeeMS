import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import EmployeesList from "./pages/Employee/EmployeesList";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import TimesheetsList from "./pages/timesheets/TimesheetsList";
import TimesheetForm from "./pages/timesheets/TimesheetForm";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Employees */}
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeForm />} />

          {/* Timesheets */}
          <Route path="/timesheets" element={<TimesheetsList />} />
          <Route path="/timesheets/new" element={<TimesheetForm />} />
          <Route path="/timesheets/:id" element={<TimesheetForm />} />

          {/* Redirect to employees by default */}
          <Route path="*" element={<EmployeesList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
