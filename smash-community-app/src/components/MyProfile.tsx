import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Characters, Character } from "../models/characters";
import { GetAllCharacters } from "../services/characters";

export function MyProfile() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    GetAllCharacters().then((data: any) => {
      setCharacters(data);
    });
  }, []);

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        {characters?.map((character: Character) => (
          <ul>
            <li>{`${character.character_name}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
