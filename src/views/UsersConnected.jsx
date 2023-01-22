import "./UsersConnected.scss";
import { useUserContext } from "../Context/UsersContext";
import { shareUrlHelper } from "../utils/currentSessionHelper";

export default function UsersConnected() {
  const { user, currentSession } = useUserContext();

  const handleShareUrl = (uuid) => {
    shareUrlHelper(uuid);
  };

  return (
    <>
      {user ? (
        <div className="users">
          <ul>
            {currentSession?.usersConnected.map((user, index) => (
              <li key={index} className="user">
                <div>{user.displayName.split("@")[0]}</div>

                <div className="card">
                  {currentSession.showCards ? (
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
      ) : null}
    </>
  );
}
