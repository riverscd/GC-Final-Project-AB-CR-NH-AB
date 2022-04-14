import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Character } from "../models/characters";
import { User } from "../models/users";
import { GetAllCharacters } from "../services/characters";

export function MyProfile() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { loggedInUser } = useContext(UserContext);
  let foundCharacter;
  useEffect(() => {
    GetAllCharacters().then((data) => {
      setCharacters(data);
    });
  }, []);
  console.log(loggedInUser);
  return (
    <div>
      <h1>My Profile</h1>

      <p>Username: {`${loggedInUser?.username}`} </p>

      <p>location: {`${loggedInUser?.city}, ${loggedInUser?.state}`}</p>

      <p>Bio: {`${loggedInUser?.bio}`}</p>

      <ul>
        {loggedInUser?.main_character?.map((characterId: number) => {
          <li key={characterId}>
            {
              (foundCharacter = characters.find(
                (character) => character.id === characterId
              ))
            }
            <img
              alt={"Main Character"}
              src={`../images/characterIcons/${foundCharacter?.character_name}.png`}
            ></img>
          </li>;
        })}
      </ul>
      <Link to="/editprofile">Edit </Link>
      <br />
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
