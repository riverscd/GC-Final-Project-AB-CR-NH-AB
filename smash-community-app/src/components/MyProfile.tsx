import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Characters, Character } from "../models/characters";
import { User } from "../models/users";
import { GetAllCharacters } from "../services/characters";
import { GetAllUsers, GetUser } from "../services/Login";

export function MyProfile() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [mainCharacter, setMainCharacter] = useState("");
  const [secondaryCharacter1, setSecondaryCharacter1] = useState("");
  const [secondaryCharacter2, setSecondaryCharacter2] = useState("");
  const [secondaryCharacter3, setSecondaryCharacter3] = useState("");
  const [secondaryCharacter4, setSecondaryCharacter4] = useState("");
  const [secondaryCharacter5, setSecondaryCharacter5] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    GetAllCharacters().then((data: any) => {
      setCharacters(data);
    });
    // GetUser(id).then((data: any) => {
    //   setUsers(data);
    // });
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

      <p>Username: </p>

      <p>Bio:</p>

      <p>location:</p>

      <div>
        <h2>Choose Your Character</h2>

        Main Character - {mainCharacter}
        Secondary Character 1- {secondaryCharacter1}
        Secondary Character 2- {secondaryCharacter2}
        Secondary Character 3- {secondaryCharacter3}
        Secondary Character 4- {secondaryCharacter4}
        Secondary Character 5- {secondaryCharacter5}
        <div>
        <label >Main Character: </label>
        
          <select onChange={(event) => { setMainCharacter(event.target.value) }}>
          {characters?.map((character: Character) => (
            <option value={`${character.character_name}`}>{`${character.character_name}`}</option>
            ))}
          </select>
       
        </div>
        
        <div>
         <label >Secondary Character 1: </label>
          <select onChange={(event) => { setSecondaryCharacter1(event.target.value) }}>
          {characters?.map((character: Character) => (
            <option value={`${character.character_name}`}>{`${character.character_name}`}</option>
            ))}
          </select>
        </div>

        <div>
         <label >Secondary Character 2: </label>
          <select onChange={(event) => { setSecondaryCharacter2(event.target.value) }}>
          {characters?.map((character: Character) => (
            <option value={`${character.character_name}`}>{`${character.character_name}`}</option>
            ))}
          </select>
        </div>

        <div>
         <label >Secondary Character 3: </label>
          <select onChange={(event) => { setSecondaryCharacter3(event.target.value) }}>
          {characters?.map((character: Character) => (
            <option value={`${character.character_name}`}>{`${character.character_name}`}</option>
            ))}
          </select>
        </div>

        <div>
         <label >Secondary Character 4: </label>
          <select onChange={(event) => { setSecondaryCharacter4(event.target.value) }}>
          {characters?.map((character: Character) => (
            <option value={`${character.character_name}`}>{`${character.character_name}`}</option>
            ))}
          </select>
        </div>

        <div>
         <label >Secondary Character 5: </label>
          <select onChange={(event) => { setSecondaryCharacter5(event.target.value) }}>
          {characters?.map((character: Character) => (
            <option value={`${character.character_name}`}>{`${character.character_name}`}</option>
            ))}
          </select>
        </div>

        </div>
      

      <Link to="/">Home</Link>
    </div>
  );
}
