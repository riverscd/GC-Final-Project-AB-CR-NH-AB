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
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  bio?: string;
  added_event_ids?: number[];
  main_character?: number[];
  secondary_characters?: number[];
  slippi_usernames?: string[];
}
