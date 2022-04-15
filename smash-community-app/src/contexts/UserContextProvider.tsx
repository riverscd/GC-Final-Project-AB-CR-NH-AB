import { Provider, ReactElement, ReactNode, useEffect, useState } from "react";
import { User } from "../models/users";
import UserContext from "./UserContext";

const userInitialValue: User = {
  id: 0,
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  birthdate: "",
  city: "",
  state: "",
  country: "",
  zip: "",
  bio: "",
  main_character: [],
  secondary_characters: [],
  slippi_usernames: [],
};

export function UserContextProvider(props: {
  children: JSX.Element;
}): ReactElement {
  //const navigate = useNavigate();

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

    //   if (userFromLocalStorage === "") {
    //     return false;
    //   } else if (userFromLocalStorage !== "") {
    //     addUser(JSON.parse(userFromLocalStorage));
    //     return true;
    //   }
    // } else if (isLoggedIn && userFromLocalStorage === "") {
    //   localStorage.setItem("user", JSON.stringify(loggedInUser));
    //   return true;
    // } else {
    //   return true;
    // }
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
