import { onValue, ref, update } from "firebase/database";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../Context/UsersContext";
import Cards from "./Cards";
import ShowCardsBtn from "./ShowCardsBtn";
import UsersConnected from "./UsersConnected";
import { db } from "../utils/firebase";
import { checkUserInCurrentSession } from "../utils/currentSessionHelper";
import { toast } from "react-hot-toast";

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

        if (!data) {
          toast.error("Invalid URL");
        }

        //Check if user exist in session
        checkUserInCurrentSession(user, data);
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
