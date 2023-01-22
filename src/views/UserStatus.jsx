import React, { useEffect, useState } from "react";
import { useUserContext } from "../Context/UsersContext";
import {
  authStatusChanged,
  handleSignOut,
  sendSignInLink,
} from "../utils/firebase";

export default function UserStatus() {
  const { user, setUser } = useUserContext();
  const [waitingLink, setWaitingLink] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    authStatusChanged((newUser) => {
      if (newUser && user !== newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  function handleLoginSubmit(e) {
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
  }

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
                {user.email}
                <button onClick={() => handleSignOut()}>Sign Out</button>
              </>
            ) : (
              "Please login"
            )}
            {!user ? (
              <form onSubmit={handleLoginSubmit}>
                <label>
                  Email:
                  <input type="email" id="formEmail" />
                </label>
                <button type="submit">Login Session</button>
              </form>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
