import { createContext } from "react";
import { User } from "../models/users";

interface UserContext {
  loggedInUser: User | undefined;
  addUser: (loggedInUser: User) => void;
  removeUser: (loggedInUser: User) => void;
}

const defaultValue: UserContext = {
  loggedInUser: {
    id: 0,
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthdate: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    bio: "",
    main_character: {
      id: 0,
      character_name: "",
    },
    secondary_characters: [
      {
        id: 0,
        character_name: "",
      },
    ],
    slippi_usernames: [],
  },
  addUser: () => {},
  removeUser: () => {}
};

const userContext = createContext<UserContext>(defaultValue);
export default userContext;
