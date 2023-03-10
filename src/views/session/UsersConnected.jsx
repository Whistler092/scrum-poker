import "./UsersConnected.scss";
import { useUserContext } from "../../Context/UsersContext";
import { shareUrlHelper } from "../../utils/currentSessionHelper";
import UsersConnectedNoSession from "./UsersConnectedNoSession";
import DisplaySummary from "./DisplaySummary";

export default function UsersConnected() {
  const { user, currentSession } = useUserContext();
  console.log("UsersConnected", currentSession?.usersConnected);

  const handleShareUrl = (uuid) => {
    shareUrlHelper(uuid);
  };

  return (
    <>
      {user ? (
        <div className="users">
          <ul>
            {currentSession?.usersConnected.map((userConnected, index) => (
              <li key={index} className="user">
                <div>{userConnected.displayName}</div>

                <div className="card">
                  {currentSession.showCards ? (
                    userConnected.effort
                  ) : userConnected.effort ? (
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

          {currentSession.showCards ? (
            <DisplaySummary currentSession={currentSession} />
          ) : null}

          {currentSession?.usersConnected.length === 1 ? (
            <div className="lonely-message">
              It's a bit lonely here. Let's invite your teammates sharing the
              url{" "}
              <span className="material-symbols-outlined">
                sentiment_satisfied
              </span>
              <button
                className="mdc-icon-button material-icons small-icon"
                onClick={() => handleShareUrl(currentSession.uuid)}
              >
                <div className="mdc-icon-button__ripple"></div>
                link
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <UsersConnectedNoSession />
      )}
    </>
  );
}
