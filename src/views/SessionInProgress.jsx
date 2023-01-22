import React from "react";
import { useUserContext } from "../Context/UsersContext";
import Cards from "./Cards";
import ShowCardsBtn from "./ShowCardsBtn";
import UsersConnected from "./UsersConnected";

/* export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    console.log("contact.loader", params, contact);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  
    return contact;
  } */

export default function SessionInProgress() {
  const { user, currentSession } = useUserContext();

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
