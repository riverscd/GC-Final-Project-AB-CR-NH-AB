import axios, { AxiosResponse } from "axios";
import { Reply } from "../models/posts";

export function GetAllReplies() {
  return axios
    .get("https://obscure-basin-51700.herokuapp.com/replies")
    .then((res: AxiosResponse<Reply[]>): Reply[] => {
      return res.data;
    });
}

export function GetRepliesByPost(post_id: number) {
  return axios
    .get(`https://obscure-basin-51700.herokuapp.com/repliesbypostid/${post_id}`)
    .then((res: AxiosResponse<Reply[]>): Reply[] => {
      return res.data;
    });
}
export function GetReplyById(id: number) {
    return axios
      .get(`https://obscure-basin-51700.herokuapp.com/replies/${id}`)
      .then((res: AxiosResponse<Reply>): Reply => {
        return res.data;
      });
  }


export function AddReply(
    author_id: number | undefined,
    message: string, 
    post_id: number
  ) { 
    return axios 
    .post("https://obscure-basin-51700.herokuapp.com/create-reply", {
    author_id: author_id,  
    message: message, 
    post_id: post_id
     
    })
    .then((res: AxiosResponse<Reply>):Reply => { 
      return res.data
    })
  }