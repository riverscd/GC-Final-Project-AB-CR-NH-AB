import { Provider, ReactElement, ReactNode, useState } from "react";
import { User } from "../models/users";
import UserContext from "./UserContext";

export function UserContextProvider(props: { children: JSX.Element }) : ReactElement  {
  const [loggedInUser, setUser] = useState<User>();

  function addUser(loggedInUser : User) {
    setUser(loggedInUser);
  };

  function removeUser(loggedInUser: User) { 
    setUser(undefined)
  }

  return ( 
    <div> 
      <UserContext.Provider
      value ={{loggedInUser, addUser, removeUser}}> 
        {props.children}
      </UserContext.Provider>
    </div>
  )
  
}
