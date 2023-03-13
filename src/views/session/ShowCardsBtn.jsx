import { useUserContext } from "../../Context/UsersContext";
import {
  resetCardsInCurrentSession,
  showCardsInCurrentSession,
} from "../../utils/currentSessionHelper";
import "./ShowCardsBtn.scss";

export default function ShowCardsBtn() {
  const { user, currentSession } = useUserContext();

  const updateCardAsActive = () => (e) => {
    if (!currentSession.showCards) {
      showCardsInCurrentSession(currentSession);
    }

    // Reset
    if (currentSession.showCards) {
      resetCardsInCurrentSession(currentSession);
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
          <button className="btn btn-light" onClick={updateCardAsActive()}>
            {!currentSession.showCards ? "Display Effort" : "Reset"}
          </button>
        </div>
      ) : null}
    </>
  );
}
