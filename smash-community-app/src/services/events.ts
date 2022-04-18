import axios, { AxiosResponse } from "axios";
import { Events } from "../models/events";

export function GetAllEvents() {
  return axios
    .get("http://localhost:3001/events")
    .then((res: AxiosResponse<Events>): Events => {
      return res.data;
    });
}

export function GetEventsByState(state: string): Promise<Event[]> { 
  return axios 
  .get(`http://localhost:3001/events/bystate/${state}`, {
    params: { 
      "state": state
    }
  }
  ).then((res: AxiosResponse<any>): any => { 
    console.log(res.data)
    return res.data
  })
}

export function GetEventsByCreator(creator_id: number): Promise<Event[]> { 
  return axios 
  .get(`http://localhost:3001/events/bycreator/${creator_id}`, { 
    params: { 
      "creator_id": creator_id
    }
  }
  ).then((res: AxiosResponse<any>): any => { 
    return res.data
  })
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
      creator_id: creator_id
    })
    .then((res: AxiosResponse<Event>): Event => {
      return res.data;
    });
}
