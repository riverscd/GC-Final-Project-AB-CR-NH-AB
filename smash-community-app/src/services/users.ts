import axios, { AxiosResponse } from "axios";
import { User, Users } from "../models/users";

export function GetAllUsers() {
  return axios
    .get("https://obscure-basin-51700.herokuapp.com/users")
    .then((res: AxiosResponse<Users>): Users => {
      return res.data;
    });
}

export function GetUserById(id: number) {
  return axios
    .get(`https://obscure-basin-51700.herokuapp.com/users/${id}`)
    .then((res: AxiosResponse<Users>): Users => {
      return res.data;
    });
}

export function LoginUser(username: string, password: string) {
  return axios
    .post(`https://obscure-basin-51700.herokuapp.com/login`, {
      username: username,
      password: password,
    })
    .then((res: AxiosResponse<User>): User => {
      return res.data;
    });
}

export function SignUpUser(
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  birthdate: string
) {
  console.log(birthdate);
  return axios
    .post(`https://obscure-basin-51700.herokuapp.com/signup`, {
      email: email,
      username: username,
      first_name: first_name,
      last_name: last_name,
      password: password,
      birthdate: birthdate,
    })
    .then((res: AxiosResponse<User>): User => {
      return res.data;
    });
}

export function UpdateUser(
  id: number | undefined,
  first_name: string,
  last_name: string,
  country: string,
  state: string,
  city: string,
  bio: string,
  main_character: number[],
  secondary_characters: number[],
  slippi_usernames: string[]
) {
  return axios
    .put(`https://obscure-basin-51700.herokuapp.com/users/${id}`, {
      first_name: first_name,
      last_name: last_name,
      country: country,
      state: state,
      city: city,
      bio: bio,
      main_character: main_character,
      secondary_characters: secondary_characters,
      slippi_usernames: slippi_usernames,
    })
    .then((res: AxiosResponse<User>): User => {
      return res.data;
    });
}

export function AddEventToUser(id: number, added_event_ids: number) {
  return axios
    .put(`https://obscure-basin-51700.herokuapp.com/user/${id}/addEvent`, {
      added_event_ids: added_event_ids,
    })
    .then((res) => {
      return res.data;
    });
}

export function AddCommunityToUser(id: number, added_community_ids: number) {
  console.log(id);
  console.log(added_community_ids);
  return axios
    .put(`https://obscure-basin-51700.herokuapp.com/user/${id}/addCommunity`, {
      added_community_ids: added_community_ids,
    })
    .then((res) => {
      return res.data;
    });
}
