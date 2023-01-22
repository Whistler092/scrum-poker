//Views
import UserStatus from "./views/UserStatus";
import LoadSessions from "./views/LoadSessions";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <>
      <div id="header">
        <h1>Poker Items</h1>
      </div>
      <div id="detail">
        <UserStatus />
        <LoadSessions />

        <Outlet />
      </div>
    </>
  );
}
