import axios, { Axios, AxiosResponse } from "axios";
import {
  Data,
  GetTournamentsResponse,
  TournamentNode,
  Tournaments,
} from "../models/smash";

export function GetAllTournaments() {
  return axios
    .get(
      "http://localhost:3001/tournaments")
    .then((res: AxiosResponse<GetTournamentsResponse>): TournamentNode[] => {
      return res.data.data.tournaments.nodes;
    });
}

export function GetTournamentsByState(state: string){
  return axios.get(
    `http://localhost:3001/tournaments/byState`,
    {params: {
      "state": state
    }}
  ).then((res: AxiosResponse<any>): any => {
    return res;
  })
}
