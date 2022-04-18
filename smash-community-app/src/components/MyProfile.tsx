import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { User } from "../models/users";
import { Character, characters } from "../models/characters";

export function MyProfile() {
  const { loggedInUser } = useContext(UserContext);

  const foundMainCharacters: Character[] = characters.filter((character) =>
    loggedInUser?.main_character?.find((characterId) => {
      return characterId === character.id;
    })
  );
  console.log(foundMainCharacters);
  const foundSecondaryCharacters: Character[] = characters.filter((character) =>
    loggedInUser?.secondary_characters?.find((characterId) => {
      return characterId === character.id;
    })
  );
  console.log(foundSecondaryCharacters);
  const mcElements: JSX.Element[] = foundMainCharacters?.map(
    (character: Character) => (
      <li key={character.id}>
        <img
          className="characterImages"
          alt={character.character_name}
          src={require(`../images/characterIcons/${character.imgSrc}.png`)}
        />
        {character.character_name}
      </li>
    )
  );

  const scElements: JSX.Element[] = foundSecondaryCharacters?.map(
    (character: Character) => (
      <li key={character.id}>
        <img
          className="characterImages"
          alt={character.character_name}
          src={require(`../images/characterIcons/${character.imgSrc}.png`)}
        />
        {character.character_name}
      </li>
    )
  );

  // loggedInUser?.main_character?.map((chartacterId) => {
  //   setFoundCharacters([
  //     ...foundCharacters,
  //     characters.find((character) => chartacterId === character.id),
  //     console.log(foundCharacters),
  //   ]);
  // });

  return (
    <div>
      <h1>My Profile</h1>

      <p>Username: {`${loggedInUser?.username}`} </p>

      <p>location: {`${loggedInUser?.city}, ${loggedInUser?.state}`}</p>

      <p>Bio: {`${loggedInUser?.bio}`}</p>

      <p>Main Characters: </p>
      <ul>{mcElements ?? <li>No Characters</li>}</ul>

      <p>Secondaries: </p>
      <ul>{scElements ?? <li>No Characters</li>}</ul>

      <p>Slippi Usernames:</p>
      <ul>
        {loggedInUser?.slippi_usernames?.map((slippiusername) => (
          <li>{slippiusername}</li>
        )) ?? <li>No Slippi Usernames</li>}
      </ul>
      <Link to="/editprofile">Edit </Link>
      <br />
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
