import React from "react";

export default function Success() {
    const email = window.localStorage.getItem("email");
  
    return <div>Enlace enviado al correo {email}</div>;
  }