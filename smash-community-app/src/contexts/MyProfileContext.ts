import { createContext } from "react";
import { User } from "../models/users";

interface MyProfileContext {
  user: User;
  addUser: (event: Event) => void;
}

const defaultValue: MyProfileContext = {
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

const MyProfileContext = createContext<MyProfileContext>(defaultValue);
export default MyProfileContext;
