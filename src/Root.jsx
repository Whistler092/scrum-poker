import { Outlet } from "react-router";
import Cards from "./Cards";
import UsersConnected from "./UsersConnected";
import { useEffect, useState } from "react";
import AppContext from "./Context/UsersContext";
import ShowCardsBtn from "./ShowCardsBtn";

export default function Root() {
  const [users, setUsers] = useState([]);
  const [cardsVisibility, setCardsVisibility] = useState(false);

  useEffect(() => {
    setUsers([
      {
        username: "whistler092",
        email: "iamramiroo@gmail.com",
        effort: "",
        myself: true,
      },
      {
        username: "Olena",
        email: "email@epam.com",
        effort: "",
        myself: false,
      },
    ]);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{ users, setUsers, cardsVisibility, setCardsVisibility }}
      >
        <div id="header">
          <h1>Poker Items</h1>
        </div>
        <div id="detail">
          <UsersConnected />
          <ShowCardsBtn />
          <hr className="dashed" />

          <Cards />
          {/* <Outlet /> */}
        </div>
      </AppContext.Provider>
    </>
  );
}
