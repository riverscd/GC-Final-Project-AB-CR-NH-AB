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
    main_character: {
      id: 0,
      character_name: "",
    },
    secondary_characters: [
      {
        id: 0,
        character_name: "",
      },
    ],
    slippi_usernames: [],
  }

export function UserContextProvider(props: { children: JSX.Element }) : ReactElement  {
  const [loggedInUser, setUser] = useState<User>();

  function addUser(loggedInUser : User) {
    setUser(loggedInUser);
  };

  function removeUser() { 
    setUser({...userInitialValue});
    localStorage.clear()
  }

  useEffect(() => { 
    localStorage.setItem("key", JSON.stringify(loggedInUser))
    console.log(loggedInUser)
  }, [])

  return ( 
    <div> 
      <UserContext.Provider
      value ={{loggedInUser, addUser, removeUser}}> 
        {props.children}
      </UserContext.Provider>
    </div>
  )
  
}
