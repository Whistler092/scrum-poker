import React, { useEffect } from "react";
import { useUserContext } from "../Context/UsersContext";
import { v4 as uid } from "uuid";
import "./Welcome.scss";
import { CURRENT_USER } from "../utils/constants";

export default function Welcome() {
  const { user, setUser } = useUserContext();

  if (user) return null;

  /* useEffect(() => {
    const fromLocalStorageUser = localStorage.getItem(CURRENT_USER);
    console.log("localStorage", fromLocalStorageUser);

    if (fromLocalStorageUser !== null) {
      setUser(JSON.parse(fromLocalStorageUser));
    }
  }, []); */

  const handleLoginSubmit = (e) => {
    console.log("handleLoginSubmit", e);

    e.preventDefault();
    const userName = e.target.userName.value;
    console.log(userName);

    const localStorageUser = {
      userName,
      uid: uid(),
    };

    localStorage.removeItem(CURRENT_USER);
    localStorage.setItem(CURRENT_USER, JSON.stringify(localStorageUser));

    setUser(localStorageUser);
  };

  const handleSignOut = () => {};

  return (
    <div className="content">
      <h2>Simple scrum Planning poker tool</h2>
      <h3>Easy-to-go poker tool in Real-Time</h3>
      Steps to get Start
      <div className="steps">
        <div className="step">
          Write your name here!
          <form onSubmit={handleLoginSubmit}>
            <div className="login-box">
              <label>
                Name to display: {"  "}
                <input type="text" id="userName" />
              </label>
              <button
                type="submit"
                className="mdc-icon-button material-icons small-icon"
                onClick={() => handleSignOut()}
              >
                <div className="mdc-icon-button__ripple"></div>
                login
              </button>
            </div>
          </form>
        </div>
        <div className="step">Share the link</div>
        <div className="step">Done!</div>
        {/* <div className="step">
          Copy URL clicking the icon{" "}
          <span className="material-symbols-outlined">link</span>
          <img src="/sent-url.png" alt="" />
        </div>
        <div className="step">
          Sent the <span className="material-symbols-outlined">link</span>
          to your teammates. You will see in Real-Time all users joining
          <img src="/several-users.png" alt="users" />
        </div>
        <div className="step">
          Vote!
          <img src="/select-card.png" alt="image" />
        </div>
        <div className="step">
          Show who's ready with their votes
          <img src="/ready-votes.png" alt="ready votes" />
        </div>
        <div className="step">
          Owner can flip cards with Display Effort button
          <img src="/ready-all-votes.png" alt="ready votes" />
        </div>

        <div className="step">
          Everybody can see efforts
          <img src="/show-votes.png" alt="ready votes" />
        </div>
        <div className="step">
          Reset all and start again
          <img src="/reset-all.png" alt="reset btn" />
        </div> */}
      </div>
    </div>
  );
}
