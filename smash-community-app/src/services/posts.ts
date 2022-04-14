import axios, { AxiosResponse } from "axios";
import { Post, Posts } from "../models/posts";


export function GetAllPosts() {
  return axios
    .get("http://localhost:3001/posts")
    .then((res: AxiosResponse<Posts>): Posts => {
      return res.data;
    });
}


export function GetPostById(id: number) {
  return axios
    .get(`http://localhost:3001/posts/${id}`)
    .then((res: AxiosResponse<Posts>): Posts => {
      return res.data;
    });
}

export function AddPost(
  post_title: string, 
  // date: string, 
  post_message: string, 
  
) { 
  return axios 
  .post("http://localhost:3001/create-post", {
    post_title: post_title, 
    // date: date, 
    post_message: post_message, 
   
  })
  .then((res: AxiosResponse<Post>):Post => { 
    return res.data
  })
}