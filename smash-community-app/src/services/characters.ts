import axios, { AxiosResponse } from "axios";
import { Character } from "../models/characters";

export function GetAllCharacters() {
  return axios
    .get("http://localhost:3001/characters")
    .then((res: AxiosResponse<Character[]>): Character[] => {
      return res.data;
    });
}
