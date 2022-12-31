import { useContext, useEffect, useState } from "react";
import "./UsersConnected.scss";
import AppContext from "./Context/UsersContext";

export default function UsersConnected() {
  const { users, setUsers, cardsVisibility } = useContext(AppContext);

  useEffect(() => {
    /* const newUsers = [...users];
    newUsers.push({
      username: "Another Users",
      email: "123@gmail.com",
      effort: 1,
    });

    setUsers(newUsers); */
    /* const newUsers = [...users]; */
  }, [users.length > 0]);

  return (
    <>
      <div className="users">
        <ul>
          {useContext &&
            users.map((user, index) => (
              <li key={index} className="user">
                <div>{user.username}</div>

                <div className="card">
                  {cardsVisibility ? (
                    user.effort
                  ) : user.effort ? (
                    <span class="material-symbols-outlined">done</span>
                  ) : (
                    <span class="material-symbols-outlined">hourglass_top</span>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
