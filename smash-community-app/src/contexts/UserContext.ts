import { createContext } from "react";
import { User } from "../models/users";

interface UserContext {
  loggedInUser: User | undefined;
  addUser: (loggedInUser: User) => void;
  removeUser: () => void;
}

export const defaultValue: UserContext = {
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
    main_character: [],
    secondary_characters: [],
    slippi_usernames: [],
  },
  addUser: () => {},
  removeUser: () => {},
};

const userContext = createContext<UserContext>(defaultValue);
export default userContext;
