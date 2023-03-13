import React from "react";
import "./Welcome.scss";

import { useUserContext } from "../Context/UsersContext";
import LoginForm from "./shared/LoginForm";

export default function Welcome() {
  const { user, setUser } = useUserContext();

  if (user) return null;

  const handleLoginSubmit = (user) => {
    setUser(user);
  };

  return (
    <div className="content">
      <h2>Simple scrum Planning poker tool</h2>
      <h3>Easy-to-go poker tool in Real-Time</h3>
      Steps to get Start
      <div className="steps">
        <div className="step">
          Write your name here!
          <LoginForm handleLogin={(e) => handleLoginSubmit(e)} />
        </div>
        <div className="step">Share the link</div>
        <div className="step">Done!</div>
      </div>
    </div>
  );
}
