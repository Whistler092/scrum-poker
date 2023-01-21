import { useContext, useEffect, useState } from "react";
import { useUserContext } from "../Context/UsersContext";
import "./ShowCardsBtn.scss";

export default function ShowCardsBtn() {
  const {
    user,
    usersToPoker,
    setUsersToPoker,
    cardsVisibility,
    setCardsVisibility,
  } = useUserContext();

  const updateCardAsActive = () => (e) => {
    if (!cardsVisibility) {
      setCardsVisibility(true);
    }

    if (cardsVisibility) {
      const newUsers = [...usersToPoker];
      newUsers.forEach((user) => {
        user.effort = "";
      });

      setUsersToPoker(newUsers);
      setCardsVisibility(false);
    }
  };

  return (
    <>
      {user ? (
        <div className="showCardsBtn">
          <button className="btn info" onClick={updateCardAsActive()}>
            {!cardsVisibility ? "Display Effort" : "Reset"}
          </button>
        </div>
      ) : null}
    </>
  );
}
