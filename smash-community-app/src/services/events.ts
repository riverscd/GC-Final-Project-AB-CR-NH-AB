import axios, { AxiosResponse } from "axios";
import { SmashEvents, SmashEvent } from "../models/events";

export function GetAllEvents() {
  return axios
    .get("http://localhost:3001/events")
    .then((res: AxiosResponse<SmashEvents>): SmashEvents => {
      return res.data;
    });
}

export function GetMultipleEventsById(
  eventIds: number[]
): Promise<SmashEvent[]> {
  return axios
    .post(`http://localhost:3001/events/selectEvents`, {
      added_event_ids: eventIds,
    })
    .then((res: AxiosResponse<SmashEvent[]>): SmashEvent[] => {
      return res.data;
    });
}

export function GetEventsByState(state: string): Promise<SmashEvent[]> {
  return axios
    .get(`http://localhost:3001/events/bystate/${state}`, {
      params: {
        state: state,
      },
    })
    .then((res: AxiosResponse<any>): any => {
      console.log(res.data);
      return res.data;
    });
}

export function GetEventsByCreator(creator_id: number): Promise<SmashEvent[]> {
  return axios
    .get(`http://localhost:3001/events/bycreator/${creator_id}`, {
      params: {
        creator_id: creator_id,
      },
    })
    .then((res: AxiosResponse<SmashEvent[]>): SmashEvent[] => {
      return res.data;
    });
}

export function AddEvent(
  event_name: string,
  event_date: string,
  location: string,
  description: string,
  address: string,
  city: string,
  zip: string,
  state: string,
  creator_id: number
) {
  return axios
    .post("http://localhost:3001/create-event", {
      event_name: event_name,
      event_date: event_date,
      location: location,
      description: description,
      address: address,
      city: city,
      zip: zip,
      state: state,
      creator_id: creator_id,
    })
    .then((res: AxiosResponse<Event>): Event => {
      return res.data;
    });
}
