import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { ref, set, update } from "firebase/database";
import { toast } from "react-hot-toast";
import { FIREBASE_SESSIONS, FIREBASE_USERS } from "./constants";
const config = import.meta.env;

export const checkUserInCurrentSession = (user, currentSession) => {
  if (!currentSession) return null;

  const newCurrentSession = { ...currentSession };
  const userExistInSession = newCurrentSession.usersConnected.find(
    (i) => i.uid == user.uid
  );
  if (!userExistInSession) {
    newCurrentSession.usersConnected.push({
      owner: false,
      uid: user.uid,
      displayName: user.userName,
      effort: 0,
    });

    update(
      ref(db, `${FIREBASE_SESSIONS}${newCurrentSession.uud1}`),
      newCurrentSession
    );
  }
};

//updateEffortInCurrentSession(userId, currentSession, !newCards[index].isActive, newCards[index].key)

export const updateEffortInCurrentSession = (
  userId,
  currentSession,
  isActive,
  key
) => {
  const newCurrentSession = { ...currentSession };
  newCurrentSession.usersConnected.forEach((userConnected) => {
    if (userId == userConnected.uid) {
      userConnected.effort = isActive ? 0 : key;
    }
  });

  update(
    ref(db, `${FIREBASE_SESSIONS}${newCurrentSession.uuid}`),
    newCurrentSession
  );
};

export const showCardsInCurrentSession = (currentSession) => {
  update(ref(db, `${FIREBASE_SESSIONS}${currentSession.uuid}`), {
    ...currentSession,
    showCards: true,
  });
};

export const resetCardsInCurrentSession = (currentSession) => {
  const newCurrentSession = { ...currentSession };
  newCurrentSession.usersConnected.forEach((userConnected) => {
    userConnected.effort = "";
  });
  newCurrentSession.showCards = false;

  update(
    ref(db, `${FIREBASE_SESSIONS}${newCurrentSession.uuid}`),
    newCurrentSession
  );
};

export const createNewSession = (user, sessions) => {
  const newUuidv4 = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  const newSession = {
    uuid: newUuidv4,
    date: new Date().toUTCString(),
    userName: user.userName,
  };
  window.localStorage.removeItem("currentSession");
  window.localStorage.setItem("currentSession", newUuidv4);
  set(ref(db, `${FIREBASE_USERS}${user.uid}/`), [...sessions, newSession]);

  set(ref(db, `${FIREBASE_SESSIONS}${newUuidv4}`), {
    ...newSession,
    showCards: false,
    usersConnected: [
      {
        owner: true,
        uid: user.uid,
        displayName: user.userName,
        effort: 0,
      },
    ],
  });
};

export const shareUrlHelper = (uuid) => {
  const fullUrl = `${config.VITE_SITE_URL}/session-in-progress/${uuid}`;
  navigator.clipboard.writeText(fullUrl);
  toast.success("URL copied to clipboard.");
};
