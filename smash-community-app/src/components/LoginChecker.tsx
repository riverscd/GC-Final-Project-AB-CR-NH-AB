import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

export function LoginChecker() {
  const { addUser } = useContext(UserContext);
  return <div></div>;
}
