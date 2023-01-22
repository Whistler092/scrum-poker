import React from "react";
import { useUserContext } from "../Context/UsersContext";
import "./Welcome.scss";

export default function Welcome() {
  const { user } = useUserContext();

  if (user) return null;

  return (
    <div className="content">
      <h2>Simple scrum Planning poker tool</h2>
      <h3>Easy-to-go poker tool in Real-Time</h3>
      Steps to get Start
      <div className="steps">
        <div className="step">
          Log in with an Email link (passwordless sign-in){" "}
          <span className="material-symbols-outlined">login</span>
          <img src="/login.png" alt="" />
        </div>
        <div className="step">
          Go to your email inbox and click <b>Sign in to URL</b>
        </div>
        <div className="step">
          Generate a new session <img src="/generate-new-session.png" alt="" />
        </div>
        <div className="step">
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
        </div>
      </div>
    </div>
  );
}
