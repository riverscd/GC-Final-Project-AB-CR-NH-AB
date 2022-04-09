import { createContext } from "react";
import { User } from "../models/users";

interface UserContext {
  user: User;
  addUser: (user: User) => void;
}

const defaultValue: UserContext = {
  user: {
    id: 0,
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
};

const userContext = createContext<UserContext>(defaultValue);
export default userContext;
