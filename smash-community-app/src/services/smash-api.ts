import axios from "axios";
import { Data, GetTournamentsResponse, Tournaments } from "../models/smash";

export function GetAllTournaments() {
  return axios
    .get("http://localhost:3001/tournaments")
    .then((res: GetTournamentsResponse): Node[] => {
      return res.data.tournaments.nodes;
    });
}
