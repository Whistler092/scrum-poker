import { useEffect, useState } from "react";
import "./Cards.scss";
import { useUserContext } from "../Context/UsersContext";
import { updateEffortInCurrentSession } from "../utils/currentSessionHelper";
import { CARDS, getRandonPattern } from "../utils/cardsHelper";

export default function Cards() {
  const { user, currentSession } = useUserContext();

  /* 
    CSS By
    https://codepen.io/ylin/pen/PVgmJQ */
  const [pattern, setPattern] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setPattern(getRandonPattern());

    const cards = CARDS;
    setCards(cards);
  }, []);

  const updateCardAsActive = (index) => (e) => {
    let newCards = [...cards];
    const currentState = newCards[index].isActive;

    //Disable All
    newCards.forEach((i) => (i.isActive = false));

    newCards[index].isActive = !currentState;

    setCards(newCards);

    updateEffortInCurrentSession(
      user.uid,
      currentSession,
      !newCards[index].isActive,
      newCards[index].key
    );
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
