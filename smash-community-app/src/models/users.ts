import { Character } from "./characters";

export interface Users {
  user: User[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  bio: string;
  main_character: Character;
  secondary_characters: Character[];
  slippi_usernames: string[];
}
