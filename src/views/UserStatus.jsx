import React, { useEffect, useState } from "react";
import { useUserContext } from "../Context/UsersContext";
import { CURRENT_USER } from "../utils/constants";
import "./UserStatus.scss";

export default function UserStatus() {
  const { user, setUser } = useUserContext();
  const [waitingLink, setWaitingLink] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    /* authStatusChanged((newUser) => {
      if (newUser && user !== newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    }); */
    const fromLocalStorageUser = localStorage.getItem(CURRENT_USER);
    console.log("localStorage", fromLocalStorageUser);

    if (fromLocalStorageUser !== null) {
      setUser(JSON.parse(fromLocalStorageUser));
    }
  }, []);

  const handleCloseSession = () => {
    localStorage.removeItem(CURRENT_USER);
    setUser(null);
  };

  /* function handleLoginSubmit(e) {
    e.preventDefault();
    const emailToSendLink = e.target.formEmail.value;
    console.log(emailToSendLink);

    sendSignInLink(emailToSendLink)
      .then((response) => {
        console.log("Success", response);
        window.localStorage.setItem("email", emailToSendLink);
        setEmail(emailToSendLink);
        setWaitingLink(true);
      })
      .catch((error) => {
        console.error("error", error);
      });
  } */

  return (
    <>
      <div>
        {!user && waitingLink ? (
          <h2>Link sent to {email}, Please check your inbox.</h2>
        ) : (
          <>
            Hi,{" "}
            {user ? (
              <>
                {user.userName}

                {/* <button
                  className="mdc-icon-button material-icons small-icon"
                  onClick={() => handleCloseSession()}
                >
                  <div className="mdc-icon-button__ripple"></div>
                  logout
                </button> */}
              </>
            ) : (
              "Please login"
            )}
            {!user ? (
              /*  <form onSubmit={handleLoginSubmit} >
                <div className="login-box">
                  <label>
                    Email: {"  "}
                    <input type="email" id="formEmail" />
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
              </form> */
              <></>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
