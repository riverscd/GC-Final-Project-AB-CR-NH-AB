import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { UserContextProvider } from "../contexts/UserContextProvider";
import { Characters, Character } from "../models/characters";
import { User } from "../models/users";
import { GetAllCharacters } from "../services/characters";

export function MyProfile() {
  
  const [users, setUsers] = useState<User[]>([]);
  const {loggedInUser} = useContext(UserContext)

  return (
    <div>
      <h1>My Profile</h1>

      <p>Username: {`${loggedInUser?.slippi_usernames}`} </p>

      <p>Bio: {`${loggedInUser?.bio }`}</p>

      <p>location: {`${loggedInUser?.state}`}</p>

      <Link to="/">Home</Link>
    </div>
  );
}
