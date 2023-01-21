import { useEffect, useState } from "react";
import "./Cards.scss";
import { useUserContext } from "../Context/UsersContext";

export default function Cards() {
  const { user, usersToPoker, setUsersToPoker } = useUserContext();

  /* 
    CSS By
    https://codepen.io/ylin/pen/PVgmJQ */
  const [pattern, setPattern] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const patterns = {
      diamonds: "♦",
      clubs: "♣",
      hearts: "♥",
      spades: "♠",
    };

    const randonNumber = Math.floor(
      Math.random() * Object.keys(patterns).length
    );
    setPattern({
      pattern: Object.entries(patterns)[randonNumber][0],
      icon: Object.entries(patterns)[randonNumber][1],
    });

    const cards = [
      { key: 0, isActive: false },
      { key: 1, isActive: false },
      { key: 2, isActive: false },
      { key: 3, isActive: false },
      { key: 5, isActive: false },
      { key: 8, isActive: false },
      { key: 13, isActive: false },
      { key: 21, isActive: false },
      { key: 34, isActive: false },
      { key: "?", isActive: false },
      { key: "∞", isActive: false },
    ];
    setCards(cards);
  }, []);

  const updateCardAsActive = (index) => (e) => {
    let newCards = [...cards];
    const currentState = newCards[index].isActive;

    //Disable All
    newCards.forEach((i) => (i.isActive = false));

    newCards[index].isActive = !currentState;

    setCards(newCards);
    console.log("newCards[index]", newCards[index]);

    const newUsers = [...usersToPoker];
    newUsers.forEach((user) => {
      if (user.myself) {
        user.effort = newCards[index].key;
      }
    });
    setUsersToPoker(newUsers);
  };

  return (
    <>
      {user ? (
        <div id="cards">
          <ul>
            {cards &&
              cards.map((card, index) => {
                return (
                  <li
                    key={index}
                    className={`card ${pattern.pattern} ${
                      card.isActive ? "active" : ""
                    }`}
                    onClick={updateCardAsActive(index)}
                  >
                    <div>{`${card.key} ${pattern.icon}`}</div>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
