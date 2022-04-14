import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Character } from "../models/characters";
import { GetAllCharacters } from "../services/characters";
import { UpdateUser } from "../services/users";

export function EditProfile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [slippi, setSlippi] = useState([]);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [mainCharacters, setMainCharacter] = useState<number>(0);
  const [secondaryCharacters, setSecondaryCharacters] = useState([]);
  const { loggedInUser, addUser } = useContext(UserContext);
  console.log(loggedInUser?.id);
  useEffect(() => {
    GetAllCharacters().then((data: any) => {
      setCharacters(data);
    });
    // GetUser(id).then((data: any) => {
    //   setUsers(data);
    // });
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(loggedInUser?.id);
    UpdateUser(
      loggedInUser?.id,
      firstName,
      lastName,
      city,
      state,
      country,
      bio
      //mainCharacter
      // secondaryCharacters[],
    ).then((updatedUser) => {
      if (updatedUser) {
        addUser(updatedUser);
        navigate("/myprofile");
      }
    });
  }

  return (
    <div>
      <form>
        <p>Create Your Profile</p>
        <label>
          <p>First Name:</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name:</p>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>
        {/* <label>
            <p>Slippi Username:</p>
            <input type="text" onChange={(e) => setSlippi(e.target.value)} />
          </label> */}
        <label>
          <p>Location Information:</p>
          <p>Country:</p>
          <input type="text" onChange={(e) => setCountry(e.target.value)} />
          <p>State:</p>
          <input type="text" onChange={(e) => setState(e.target.value)} />
          <p>City:</p>
          <input type="text" onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          <p>User Bio:</p>
          <input type="text" onChange={(e) => setBio(e.target.value)} />
        </label>
        <button className="button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div>
        {/* <h2>Choose Your Character</h2>
        Main Character - {mainCharacter}
        Secondary Character- {secondaryCharacters} */}
        {/* <div>
          <label>Main Character: </label>

          <select
            onChange={(event) => {
              setMainCharacter(parseInt(event.target.value));
            }}
          >
            {characters?.map((character: Character) => (
              <option
                value={`${character.id}`}
              >{`${character.character_name}`}</option>
            ))}
          </select>
        </div> */}
        <div>
          {/* {/* <label>Secondary Character 1: </label> */}

          {/* onChange={(event) => {
              setSecondaryCharacters(event.target.value);
            }} */}
          {/* <select> 
            {characters?.map((character: Character) => (
              <option
                value={`${character.character_name}`}
              >{`${character.character_name}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Secondary Character 2: </label>
          <select
            onChange={(event) => {
              setSecondaryCharacter2(event.target.value);
            }}
          >
            {characters?.map((character: Character) => (
              <option
                value={`${character.character_name}`}
              >{`${character.character_name}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Secondary Character 3: </label>
          <select
            onChange={(event) => {
              setSecondaryCharacter3(event.target.value);
            }}
          >
            {characters?.map((character: Character) => (
              <option
                value={`${character.character_name}`}
              >{`${character.character_name}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Secondary Character 4: </label>
          <select
            onChange={(event) => {
              setSecondaryCharacter4(event.target.value);
            }}
          >
            {characters?.map((character: Character) => (
              <option
                value={`${character.character_name}`}
              >{`${character.character_name}`}</option>
            ))}
          </select> */}
          {/* </div>
        <div>
          <label>Secondary Character 5: </label>
          <select
            onChange={(event) => {
              setSecondaryCharacter5(event.target.value);
            }}
          >
            {characters?.map((character: Character) => (
              <option
                value={`${character.character_name}`}
              >{`${character.character_name}`}</option>
            ))}
          </select> */}
        </div>
      </div>
    </div>
  );
}
