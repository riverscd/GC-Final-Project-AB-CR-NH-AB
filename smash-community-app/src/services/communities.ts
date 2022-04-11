import axios, { AxiosResponse } from "axios";
import { Communities, Community } from "../models/communities";

export function GetAllCommunities() {
  return axios
    .get("http://localhost:3001/communities")
    .then((res: AxiosResponse<Communities>): Communities => {
      return res.data;
    });
}


export function AddCommunity(
  community_name: string, 
  // date: string, 
  location: string, 
  description: string
) { 
  return axios 
  .post("http://localhost:3001/create-community", {
    community_name: community_name, 
    // date: date, 
    location: location, 
    description: description
  })
  .then((res: AxiosResponse<Community>): Community => { 
    return res.data
  })
}
