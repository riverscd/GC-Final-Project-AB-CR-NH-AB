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

  function addUser(loggedInUser: User) {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setIsLoggedIn(true);
  }

  function logoutUser() {
    setUser({ ...userInitialValue });
    setIsLoggedIn(false);
    localStorage.clear();
  }

  function checkLoginStatus(): boolean {
    // let userFromLocalStorage =
    //   window.localStorage.getItem("user") ?? "No user in storage";
    // console.log(isLoggedIn);
    // console.log(loggedInUser);
    // console.log(userFromLocalStorage);
    // if (isLoggedIn && userFromLocalStorage === "No user in storage") {
    //   localStorage.setItem("user", JSON.stringify(loggedInUser));
    //   return true;
    // } else if (isLoggedIn && userFromLocalStorage !== "No user in storage") {
    //   return true;
    // } else if (
    //   isLoggedIn === false &&
    //   userFromLocalStorage !== "No user in storage"
    // ) {
    //   //console.log(JSON.parse(userFromLocalStorage));
    //   //setUser(JSON.parse(userFromLocalStorage));
    //   return true;
    // } else {
    //   return false;
    // if(isLoggedIn === false){

    //   if(window.localStorage.getItem("user") === null){
    //     return false;
    //   }else{
    //     setUser(JSON.parse(window.localStorage.getItem("user")!.toString() ))
    //     return true;
    //   }
    //   return false;
    // }

    return false;
  }
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    console.log(loggedInUser);
  }, []);

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
