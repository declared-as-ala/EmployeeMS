// src/components/NavBar.tsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Management
        </Typography>

        <Link
          component={RouterLink}
          to="/employees"
          color="inherit"
          underline="none"
        >
          <Button color="inherit">Employees</Button>
        </Link>

        <Link
          component={RouterLink}
          to="/timesheets"
          color="inherit"
          underline="none"
        >
          <Button color="inherit">Timesheets</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
