import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Layout/NavigationBar";
import { SessionProvider } from "../hooks/session";
import { Container } from "@mui/material";

export default function Layout() {
 
  return (
    <SessionProvider>
      <NavigationBar />
      <Container maxWidth="lg" id="app-content">
        <Outlet />
      </Container>
    </SessionProvider>
  );
}