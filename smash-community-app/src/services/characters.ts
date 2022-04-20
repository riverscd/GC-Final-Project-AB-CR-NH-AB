import axios, { AxiosResponse } from "axios";
import { Character } from "../models/characters";

export function GetAllCharacters() {
  return axios
    .get("http://obscure-basin-51700.herokuapp.com/characters")
    .then((res: AxiosResponse<Character[]>): Character[] => {
      return res.data;
    });
}
