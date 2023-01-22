//Views
import UserStatus from "./views/UserStatus";
import LoadSessions from "./views/LoadSessions";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export default function Root() {
  return (
    <>
      <div id="header">
        <div>
          <Toaster />
        </div>

        <div className="banner">
          <h1>Poker Items</h1>
          <UserStatus />
        </div>
      </div>
      <div id="detail">
        <LoadSessions />

        <Outlet />
      </div>
      <div className="autor">
        Dev with <span className="material-symbols-outlined">favorite</span> by
        <a target="_blank" href="https://ramirobedoya.me/">
          {" "}
          Ramiro Bedoya
        </a>
      </div>
    </>
  );
}
