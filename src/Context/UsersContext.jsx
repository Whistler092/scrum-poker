import React, { useState, useMemo, createContext, useEffect } from "react";
import { authStatusChanged, db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [usersToPoker, setUsersToPoker] = useState([]);
  const [cardsVisibility, setCardsVisibility] = useState(false);

  authStatusChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  // Esto sirve es para que no se haga un render de mas cuando se cambie una variable
  const value = useMemo(
    () => ({
      user,
      setUser,
      usersToPoker,
      setUsersToPoker,
      cardsVisibility,
      setCardsVisibility,
    }),
    [user, usersToPoker, cardsVisibility]
  );

  useEffect(() => {
    //https://firebase.google.com/docs/database/web/read-and-write#web-version-9
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      //console.log("users from firebase", data);
      setUsersToPoker(data);
    });
  }, []);

  //console.log("UserContextProvider returning");
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export function useUserContext() {
  //console.log("creating useUserContext");
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}
