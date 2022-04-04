import axios from "axios";

export function GetAllTournaments() {
  return axios
    .get("http://localhost:3001/tournaments")
    .then(function (response: any) {
      return response.data;
    });
}
