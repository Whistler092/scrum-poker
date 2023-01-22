import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../Context/UsersContext";
import { db } from "../utils/firebase";
import "./LoadSessions.scss";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { createNewSession } from "../utils/currentSessionHelper";
const config = import.meta.env;

export default function LoadSessions() {
  const { user, currentSession, setCurrentSession } = useUserContext();
  const [sessions, setSessions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      //https://firebase.google.com/docs/database/web/read-and-write#web-version-9
      const userRef = ref(db, `users/${user?.uid}/`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();

        if (data === null) setSessions([]);
        else {
          setSessions(data);

          const savedCurrentSession =
            window.localStorage.getItem("currentSession");
          if (savedCurrentSession) {
            const session = data.find((row) => row.uuid == savedCurrentSession);
            console.log("session", session);
            navigate(`/session-in-progress/${savedCurrentSession}`);
          }
        }
      });
    }
  }, [user]);

  const handleRemoveSession = () => {
    console.log("handleRemoveSession");
    window.localStorage.clear("currentSession");
    setCurrentSession(null);
    navigate(`/`);
  };

  const handleShareUrl = (uuid) => {
    const fullUrl = `${config.VITE_SITE_URL}/session-in-progress/${uuid}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("URL copied to clipboard.");
  };

  const handleNewSession = () => {
    createNewSession(user, sessions);
  };

  const loadSavedSessions = (uuid) => {
    console.log("loadSavedSessions", uuid);
    window.localStorage.clear("currentSession");

    if (uuid) {
      navigate(`/session-in-progress/${uuid}`);
    }
  };

  if (!user) return null;

  if (sessions === null) return <>Loading sessions...</>;

  if (currentSession) {
    return (
      <div className="single-session">
        <div key={currentSession.uuid} className="sessions">
          <div>{currentSession.uuid}</div>
          <div>Created: {new Date(currentSession.date).toLocaleString()}</div>
          <div>
            <button
              className="mdc-icon-button material-icons small-icon"
              onClick={() => handleShareUrl(currentSession.uuid)}
            >
              <div className="mdc-icon-button__ripple"></div>
              link
            </button>
            <button
              className="mdc-icon-button material-icons small-icon"
              onClick={() => handleRemoveSession()}
            >
              <div className="mdc-icon-button__ripple"></div>
              cancel_presentation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sessions && currentSession === null
        ? sessions.map((session) => (
            <div
              key={session.uuid}
              className="sessions sessions-click"
              onClick={() => loadSavedSessions(session.uuid)}
            >
              <div>{session.uuid}</div>
              <div>Created: {new Date(session.date).toLocaleString()}</div>
            </div>
          ))
        : null}
      <button onClick={() => handleNewSession()}>Generate New Session</button>
    </div>
  );
}
