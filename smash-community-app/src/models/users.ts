export interface Users {
  user: User[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  bio?: string;
  added_event_ids?: number[];
  added_community_ids?: number[];
  main_character?: number[];
  secondary_characters?: number[];
  slippi_usernames?: string[];
}
