import { KeyboardEventHandler, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { characters } from "../models/characters";
import { UpdateUser } from "../services/users";
import Select from "react-select";

import CreatableSelect from "react-select";
import { ActionMeta, OnChangeValue, MultiValue } from "react-select";
import { createTheme, ThemeProvider, Typography } from "@mui/material";

export function EditProfile() {
  const components = {
    DropdownIndicator: null,
  };

  interface Option {
    readonly label: string;
    readonly value: string;
  }

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const navigate = useNavigate();
  const { loggedInUser, addUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [creatableSelectValues, setCreatableSelectValues] = useState<
    OnChangeValue<Option, true>
  >([]);
  const [inputValues, setInputValues] = useState<string>("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [slippi, setSlippi] = useState<string[]>([]);
  const [mainCharacters, setMainCharacters] = useState<number[]>([]);
  const [secondaryCharacters, setSecondaryCharacters] = useState<number[]>([]);

  const options = characters.map((character) => {
    return { value: character.id, label: character.character_name };
  });
  function handleSubmit(e: any) {
    e.preventDefault();

    UpdateUser(
      loggedInUser?.id,
      firstName,
      lastName,
      city,
      addrState,
      country,
      bio,
      mainCharacters,
      secondaryCharacters,
      slippi
    ).then((updatedUser) => {
      if (updatedUser) {
        addUser(updatedUser);
        navigate("/myprofile");
      }
    });
  }

  const handleChange = (value: OnChangeValue<Option, true>) => {
    setCreatableSelectValues(value);
  };
  const handleInputChange = (inputValue: string) => {
    setInputValues(inputValue);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!inputValues) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        event.preventDefault();
        setCreatableSelectValues([
          ...creatableSelectValues,
          createOption(inputValues),
        ]);
        setInputValues("");
        setSlippi([...slippi, inputValues]);
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <div>
      <form onSubmit={handleSubmit}>
        <p>Edit Your Profile</p>
        <label>
          <p>First Name:</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name:</p>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Location Information:</p>
          <p>Country:</p>
          <input type="text" onChange={(e) => setCountry(e.target.value)} />
          <p>State:</p>
          <input type="text" onChange={(e) => setAddrState(e.target.value)} />
          <p>City:</p>
          <input type="text" onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          <p>User Bio:</p>
          <input type="text" onChange={(e) => setBio(e.target.value)} />
        </label>
        <br />
        <div className="character-selects">
          <br />
        <label>
          Mains:
          <Typography sx={{color: 'black'}}>
          <Select
            options={options}
            isMulti
            name="main_characters"
            className="basic-multi-select"
            classNamePrefix="select"
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'lightskyblue',
                primary: 'black',
              },
            })}
            onChange={(newValues) => {
              setMainCharacters(newValues.map((newValue) => newValue.value));
            }}
          />
          </Typography>
        </label>
        <br />
        <label>
          
          Secondaries:
          <Typography sx={{color: 'black'}}>
          <Select
            options={options}
            isMulti
            name="secondary_characters"
            className="basic-multi-select"
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'lightskyblue',
                primary: 'black',
              },
            })}
            classNamePrefix="select"
            onChange={(newValues) => {
              setSecondaryCharacters(
                newValues.map((newValue) => newValue.value)
              );
            }}
          />
          </Typography>
        </label>
        <br />
        <label>
          Type slippi Username and Press Enter to Add:
          <CreatableSelect
            components={components}
            inputValue={inputValues}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter Slippi Usernames"
            value={creatableSelectValues}
          />
        </label>
        </div>
        <br />
        <button className="button" type="submit">
          Submit
        </button>
       <br />
        <Link to="/myprofile">Back to My Profile</Link>
        
      </form>
    </div>
    </ThemeProvider>
  );
}
