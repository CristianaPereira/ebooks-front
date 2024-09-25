import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Layout/NavigationBar";
import { SessionProvider } from "../hooks/session";

export default function Layout() {
 
  return (
    <SessionProvider>
      <NavigationBar />
      <Outlet />
    </SessionProvider>
  );
}