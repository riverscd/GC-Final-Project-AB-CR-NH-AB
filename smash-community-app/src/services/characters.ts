import axios, { AxiosResponse } from "axios";
import { Characters } from "../models/characters";

export function GetAllCharacters() {
  return axios
    .get("http://localhost:3001/characters")
    .then((res: AxiosResponse<Characters>): Characters => {
      return res.data;
    });
}


