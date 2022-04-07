import axios, { AxiosResponse } from "axios";
import { Users } from "../models/users";

export function GetAllUsers() {
  return axios
    .get("http://localhost:3001/users")
    .then((res: AxiosResponse<Users>): Users => {
      return res.data;
    });
}