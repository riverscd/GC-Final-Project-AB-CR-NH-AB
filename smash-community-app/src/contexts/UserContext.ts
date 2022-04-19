import { createContext } from "react";
import { User } from "../models/users";

interface UserContext {
  isLoggedIn: boolean;
  loggedInUser: User | undefined;
  addUser: (loggedInUser: User) => void;
  logoutUser: () => void;
  checkLoginStatus: () => boolean;
}

export const defaultValue: UserContext = {
  isLoggedIn: false,
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
    added_event_ids: [],
    main_character: [],
    secondary_characters: [],
    slippi_usernames: [],
  },
  addUser: () => {},
  logoutUser: () => {},
  checkLoginStatus: () => {
    return false;
  },
};

const userContext = createContext<UserContext>(defaultValue);
export default userContext;
