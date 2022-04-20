import axios, { Axios, AxiosResponse } from "axios";
import {
  Data,
  GetTournamentsResponse,
  TournamentNode,
  Tournaments,
} from "../models/smash";

export function GetAllTournaments() : Promise<TournamentNode[]> {
  return axios
    .get(
      "http://obscure-basin-51700.herokuapp.com/tournaments")
    .then((res: AxiosResponse<GetTournamentsResponse>): TournamentNode[] => {
      return res.data.data.tournaments.nodes;
    });
}

export function GetTournamentsByState(state: string) : Promise<TournamentNode[]> {
  return axios.get(
    `http://obscure-basin-51700.herokuapp.com/tournaments/byState`,
    {
      params: {
      "state": state
      }
    }
  ).then((res: AxiosResponse<any>): any => {
    return res.data.data.tournaments.nodes;  })
}
