import { onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../Context/UsersContext";
import Cards from "./Cards";
import ShowCardsBtn from "./ShowCardsBtn";
import UsersConnected from "./UsersConnected";
import { db } from "../utils/firebase";

export default function SessionInProgress() {
  const { user, currentSession, setCurrentSession } = useUserContext();
  let { sessionId } = useParams();

  useEffect(() => {
    if (user && sessionId) {
      //https://firebase.google.com/docs/database/web/read-and-write#web-version-9
      const userRef = ref(db, `sessions/${sessionId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(
          `Current Session sessions/${sessionId}  from firebase`,
          data
        );
        setCurrentSession(data);
      });
    }
  }, [user]);

  if (!currentSession) return null;

  return (
    <div>
      <UsersConnected />
      <ShowCardsBtn />
      <hr className="dashed" />

      <Cards />
    </div>
  );
}
