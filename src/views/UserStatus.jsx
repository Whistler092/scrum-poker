import React, { useEffect, useState } from "react";
import { useUserContext } from "../Context/UsersContext";
import { CURRENT_USER } from "../utils/constants";
import "./UserStatus.scss";

export default function UserStatus() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const fromLocalStorageUser = localStorage.getItem(CURRENT_USER);
    console.log("localStorage", fromLocalStorageUser);

    if (fromLocalStorageUser !== null) {
      setUser(JSON.parse(fromLocalStorageUser));
    }
  }, []);

  return (
    <>
      <div>
        (<>Hi, {user ? <>{user.userName}</> : "Please login"}</>)
      </div>
    </>
  );
}
