import React, { useState, useMemo, createContext, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  // Esto sirve es para que no se haga un render de mas cuando se cambie una variable
  const value = useMemo(
    () => ({
      user,
      setUser,
      currentSession,
      setCurrentSession,
    }),
    [user, currentSession]
  );

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
