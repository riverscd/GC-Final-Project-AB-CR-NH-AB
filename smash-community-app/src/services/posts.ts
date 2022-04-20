import axios, { AxiosResponse } from "axios";
import { Post, Posts } from "../models/posts";


export function GetAllPosts() {
  return axios
    .get("http://obscure-basin-51700.herokuapp.com/posts")
    .then((res: AxiosResponse<Posts>): Posts => {
      return res.data;
    });
}


export function GetPostById(id: number) {
  return axios
    .get(`http://obscure-basin-51700.herokuapp.com/posts/${id}`)
    .then((res: AxiosResponse<Posts>): Posts => {
      return res.data;
    });
}

export function AddPost(
  author_id: number | undefined,
  post_title: string, 
  // date: string, 
  post_message: string, 
) { 
  return axios 
  .post("http://obscure-basin-51700.herokuapp.com/create-post", {
  author_id: author_id,  
  post_title: post_title, 
    // date: date, 
    post_message: post_message, 
   
  })
  .then((res: AxiosResponse<Post>):Post => { 
    return res.data
  })
}