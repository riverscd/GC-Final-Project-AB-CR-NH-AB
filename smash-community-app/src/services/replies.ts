import axios, { AxiosResponse } from "axios";
import { Replies, Reply } from "../models/posts";

export function GetAllReplies() {
  return axios
    .get("http://localhost:3001/replies")
    .then((res: AxiosResponse<Reply[]>): Reply[] => {
      return res.data;
    });
}
export function GetReplyById(id: number) {
    return axios
      .get(`http://localhost:3001/replies/${id}`)
      .then((res: AxiosResponse<Replies>): Replies => {
        return res.data;
      });
  }


export function AddReply(
    author_id: number | undefined,
    message: string, 
  ) { 
    return axios 
    .post("http://localhost:3001/create-reply", {
    author_id: author_id,  
    message: message, 
     
    })
    .then((res: AxiosResponse<Reply>):Reply => { 
      return res.data
    })
  }