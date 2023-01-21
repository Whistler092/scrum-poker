import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./Context/UsersContext";
import "./index.css";
// Views
import Root from "./Root";
import LoginUrl from "./views/LoginUrl";
import Success from "./views/Success";
import InvalidUrl from "./views/InvalidUrl";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/invalid-url",
    element: <InvalidUrl />,
  },
  {
    path: "/login-url",
    element: <LoginUrl />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
