import axios, { AxiosResponse } from "axios";
import { Posts } from "../models/posts";


export function GetAllPosts() {
  return axios
    .get("http://localhost:3001/posts")
    .then((res: AxiosResponse<Posts>): Posts => {
      return res.data;
    });
}