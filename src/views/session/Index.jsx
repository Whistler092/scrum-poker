import { onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

import Cards from "./Cards";
import ShowCardsBtn from "./ShowCardsBtn";
import UsersConnected from "./UsersConnected";
import UsersConnectedNoSession from "./UsersConnectedNoSession";

import { checkUserInCurrentSession } from "../../utils/currentSessionHelper";
import { db } from "../../utils/firebase";
import { FIREBASE_SESSIONS } from "../../utils/constants";
import { useUserContext } from "../../Context/UsersContext";

export default function SessionInProgress() {
  const { user, currentSession, setCurrentSession } = useUserContext();
  let { sessionId } = useParams();

  console.log("SessionInProgress.sessionId", sessionId);

  useEffect(() => {
    if (user && sessionId) {
      //https://firebase.google.com/docs/database/web/read-and-write#web-version-9
      const url = `${FIREBASE_SESSIONS}${sessionId}`;
      console.log("SessionInProgress", url, currentSession);
      const userRef = ref(db, url);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();

        console.log("SessionInProgress.response", data);

        setCurrentSession(data);

        if (!data) {
          toast.error("Invalid URL");
        }

        //Check if user exist in session
        checkUserInCurrentSession(user, data);
      });
    }
  }, [user]);

  return (
    <div>
      {user === null ? <UsersConnectedNoSession /> : null}

      {currentSession ? (
        <>
          <UsersConnected />
          <ShowCardsBtn />
          <hr className="dashed" />

          <Cards />
        </>
      ) : null}
    </div>
  );
}
