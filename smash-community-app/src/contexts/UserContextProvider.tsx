import { Provider, ReactElement, ReactNode, useState } from "react";
import { User } from "../models/users";
import UserContext from "./UserContext";

export function UserContextProvider(props: { children: JSX.Element }) : ReactElement  {
  const [loggedInUser, setUser] = useState<User>();

  function addUser(loggedInUser : User) {
    setUser(loggedInUser);
  };

  return ( 
    <div> 
      <UserContext.Provider
      value ={{loggedInUser!, addUser}}> 
        {props.children}
      </UserContext.Provider>
    </div>
  )
  
}
