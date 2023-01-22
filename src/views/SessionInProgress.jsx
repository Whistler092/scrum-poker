import { onValue, ref, update } from "firebase/database";
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

        setCurrentSession(data);

        //Check if user exist in session
        const newCurrentSession = { ...data };
        const userExistInSession = newCurrentSession.usersConnected.find(
          (i) => i.uid == user.uid
        );
        if (!userExistInSession) {
          newCurrentSession.usersConnected.push({
            owner: false,
            uid: user.uid,
            displayName: user.email,
            effort: 0,
          });

          update(
            ref(db, `sessions/${newCurrentSession.uuid}`),
            newCurrentSession
          );
        }
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
