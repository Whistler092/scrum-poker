import { useContext, useEffect, useState } from "react";
import "./UsersConnected.scss";
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import { useUserContext } from "../Context/UsersContext";

export default function UsersConnected() {
  /* const { users, setUsers, cardsVisibility } = useContext(AppContext); */
  const { user, usersToPoker, setUsersToPoker, cardsVisibility } =
    useUserContext();

  useEffect(() => {
    const query = ref(db, "users");
    /* query.push(users); */
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          console.log("project", project);
        });
      }
    });

    /* const newUsers = [...users];
    newUsers.push({
      username: "Another Users",
      email: "123@gmail.com",
      effort: 1,
    });

    setUsers(newUsers); */
    /* const newUsers = [...users]; */
  }, [usersToPoker.length > 0]);

  return (
    <>
      {user ? (
        <div className="users">
          <ul>
            {useContext &&
              usersToPoker.map((user, index) => (
                <li key={index} className="user">
                  <div>{user.username}</div>

                  <div className="card">
                    {cardsVisibility ? (
                      user.effort
                    ) : user.effort ? (
                      <span className="material-symbols-outlined">done</span>
                    ) : (
                      <span className="material-symbols-outlined">
                        hourglass_top
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
