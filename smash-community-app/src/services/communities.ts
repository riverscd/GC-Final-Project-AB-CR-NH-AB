import axios, { AxiosResponse } from "axios";
import { Communities } from "../models/communities";

export function GetAllCommunities() {
  return axios
    .get("http://localhost:3001/communities")
    .then((res: AxiosResponse<Communities>): Communities => {
      return res.data;
    });
}
