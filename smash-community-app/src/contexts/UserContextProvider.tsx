import { Provider, ReactNode, useState } from "react";
import { User } from "../models/users";

export function UserContextProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User>();

  function addUser(loggedInUser : User): void {
    setUser(loggedInUser);
  };

  return ( 
    <div> 
      <UserContextProvider.Provider
      value ={{addUser}}> 
        {props.children}
      </UserContextProvider.Provider>
    </div>
  )
  
}
