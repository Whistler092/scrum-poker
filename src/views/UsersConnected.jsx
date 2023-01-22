import "./UsersConnected.scss";
import { useUserContext } from "../Context/UsersContext";

export default function UsersConnected() {
  const { user, currentSession } = useUserContext();

  return (
    <>
      {user ? (
        <div className="users">
          <ul>
            {currentSession?.usersConnected.map((user, index) => (
              <li key={index} className="user">
                <div>{user.displayName}</div>

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
        </div>
      ) : null}
    </>
  );
}
