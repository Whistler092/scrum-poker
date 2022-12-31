import { useContext, useEffect, useState } from "react";
import "./ShowCardsBtn.scss";
import AppContext from "./Context/UsersContext";

export default function ShowCardsBtn() {
  const { users, setUsers, cardsVisibility, setCardsVisibility } =
    useContext(AppContext);

  const updateCardAsActive = () => (e) => {
    if (!cardsVisibility) {
      setCardsVisibility(true);
    }

    if (cardsVisibility) {
      const newUsers = [...users];
      newUsers.forEach((user) => {
        user.effort = "";
      });

      setUsers(newUsers);
      setCardsVisibility(false);
    }
  };

  return (
    <>
      <div className="showCardsBtn">
        <button class="btn info" onClick={updateCardAsActive()}>
          {!cardsVisibility ? "Display Effort" : "Reset"}
        </button>
      </div>
    </>
  );
}
