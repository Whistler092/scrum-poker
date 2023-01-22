import { ref, update } from "firebase/database";
import { useUserContext } from "../Context/UsersContext";
import { db } from "../utils/firebase";
import "./ShowCardsBtn.scss";

export default function ShowCardsBtn() {
  const { user, currentSession } = useUserContext();

  const updateCardAsActive = () => (e) => {
    if (!currentSession.showCards) {
      update(ref(db, `sessions/${currentSession.uuid}`), {
        ...currentSession,
        showCards: true,
      });
    }

    // Reset
    if (currentSession.showCards) {
      const newCurrentSession = { ...currentSession };
      newCurrentSession.usersConnected.forEach((userConnected) => {
        userConnected.effort = "";
      });
      newCurrentSession.showCards = false;

      update(ref(db, `sessions/${newCurrentSession.uuid}`), newCurrentSession);
    }
  };

  if (!user || !currentSession) return null;

  const isCurrentUserOwner = currentSession?.usersConnected.find(
    (userConnected) => user.uid == userConnected.uid
  )?.owner;

  return (
    <>
      {isCurrentUserOwner ? (
        <div className="showCardsBtn">
          <button className="btn info" onClick={updateCardAsActive()}>
            {!currentSession.showCards ? "Display Effort" : "Reset"}
          </button>
        </div>
      ) : null}
    </>
  );
}
