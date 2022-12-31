import React from "react";

const AppContext = React.createContext({
  users: [],
  setUsers: () => {},
  cardsVisibility: false,
  setCardsVisibility: () => {},
});

export default AppContext;
