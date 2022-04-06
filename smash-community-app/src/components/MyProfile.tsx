import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Characters } from "../models/characters";
import { GetAllCharacters } from "../services/characters";

export function MyProfile() {
  const [characters, setCharacters] = useState<Characters[]>([]);

  useEffect(() => {
    GetAllCharacters().then((data: any) => {
      setCharacters(data);
    });
  }, []);

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        {characters?.map((character: Characters) => (
          <ul>
            <li>{`${character.character_name}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
