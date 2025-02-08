// src/components/Layout.tsx
import React from "react";
import Container from "@mui/material/Container";
import NavBar from "../NavBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 4 }}>{children}</Container>
    </>
  );
}

export default Layout;
