import axios, { AxiosResponse } from "axios";
import { Events } from "../models/events";

export function GetAllEvents() {
  return axios
    .get("http://localhost:3001/events")
    .then((res: AxiosResponse<Events>): Events => {
      return res.data;
    });
}
