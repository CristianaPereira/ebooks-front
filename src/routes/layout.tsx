import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Layout/NavigationBar";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}