import React from "react";
import { useUserContext } from "../Context/UsersContext";

export default function Welcome() {
  const { user } = useUserContext();

  if (user) return null;

  return (
    <div>
      <h1>Scrum Planning poker tool</h1>
    </div>
  );
}
