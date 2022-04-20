import axios, { AxiosResponse } from "axios";
import { MyCommunities } from "../components/MyCommunities";
import { Communities, Community } from "../models/communities";

export function GetAllCommunities() {
  return axios
    .get("https://obscure-basin-51700.herokuapp.com/communities")
    .then((res: AxiosResponse<Communities>): Communities => {
      return res.data;
    });
}

export function GetCommunitiesByLocation(
  location: string
): Promise<Community[]> {
  return axios
    .get(`https://obscure-basin-51700.herokuapp.com/communities/bylocation/${location}`, {
      params: {
        location: location,
      },
    })
    .then((res: AxiosResponse<any>): any => {
      console.log(res.data);
      return res.data;
    });
}

export function GetMultipleCommunitiesById(
  communityIds: number[]
): Promise<Community[]> {
  return axios
    .post(`https://obscure-basin-51700.herokuapp.com/communities/selectCommunities`, {
      added_community_ids: communityIds,
    })
    .then((res: AxiosResponse<Community[]>): Community[] => {
      return res.data;
    });
}

export function GetCommunitiesByCreator(
  creator_id: number
): Promise<Community[]> {
  return axios
    .get(`https://obscure-basin-51700.herokuapp.com/communities/bycreator/${creator_id}`, {
      params: {
        creator_id: creator_id,
      },
    })
    .then((res: AxiosResponse<Community[]>): Community[] => {
      return res.data;
    });
}

export function AddCommunity(
  community_name: string,
  // date: string,
  location: string,
  description: string,
  creator_id: number
) {
  console.log(creator_id);
  return axios
    .post("https://obscure-basin-51700.herokuapp.com/create-community", {
      community_name: community_name,
      // date: date,
      location: location,
      description: description,
      creator_id: creator_id,
    })
    .then((res: AxiosResponse<Community>): Community => {
      return res.data;
    });
}

// export function DeleteCommunity(id :number) { 
//   return axios 
//     .delete(`https://localhost:3001/communities/${id}`,)
//     .then((res: AxiosResponse<any>) => { 
//       return console.log("community deleted")
//     })
// }