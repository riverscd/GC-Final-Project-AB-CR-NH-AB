import { ReactElement, useState } from "react";
import { User } from "../models/users";
import UserContext from "./UserContext";

const userInitialValue: User = {
  id: 0,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  birthdate: "",
  city: "",
  state: "",
  country: "",
  zip: "",
  bio: "",
  added_event_ids: [],
  added_community_ids: [],
  main_character: [],
  secondary_characters: [],
  slippi_usernames: [],
};

export function UserContextProvider(props: {
  children: JSX.Element;
}): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [loggedInUser, setUser] = useState<User>();

  function addUser(user: User) {
    setUser(user);
    setIsLoggedIn(true);
  }

  function logoutUser() {
    setUser({ ...userInitialValue });
    setIsLoggedIn(false);
    localStorage.clear();
  }

  function checkLoginStatus(): boolean {
    const userFromLocalStorage = window.localStorage.getItem("user") ?? "{}";
    if (!isLoggedIn) {
      if (userFromLocalStorage !== "{}") {
        try {
          const result = JSON.parse(userFromLocalStorage);
        } catch (err) {
          console.log(err);
        }
        addUser(JSON.parse(userFromLocalStorage));
        console.log(userFromLocalStorage);
      }
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <UserContext.Provider
        value={{
          isLoggedIn,
          loggedInUser,
          addUser,
          logoutUser,
          checkLoginStatus,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </div>
  );
}
