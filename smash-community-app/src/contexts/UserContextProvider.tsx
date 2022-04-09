import { Provider, ReactElement, ReactNode, useState } from "react";
import { User } from "../models/users";
import UserContext from "./UserContext";

export function UserContextProvider(props: { children: JSX.Element }) : ReactElement  {
  const [user, setUser] = useState<User>();

  function addUser(loggedInUser : User) {
    setUser(loggedInUser);
  };

  return ( 
    <div> 
      <UserContext.Provider
      value ={{addUser}}> 
        {props.children}
      </UserContext.Provider>
    </div>
  )
  
}
