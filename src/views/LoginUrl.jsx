import React from "react";
import { handleSignInLink } from "../utils/firebase";

export default function LoginUrl() {
  React.useEffect(() => {
    // Function to handle login
    handleSignInLink(window.location.href)
      .then((result) => {
        console.log("Success", result);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return <div>Loading...</div>;
}
