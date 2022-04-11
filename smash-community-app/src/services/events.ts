import axios, { AxiosResponse } from "axios";
import { Events } from "../models/events";

export function GetAllEvents() {
  return axios
    .get("http://localhost:3001/events")
    .then((res: AxiosResponse<Events>): Events => {
      return res.data;
    });
}

export function AddEvent(
  event_name: string, 
  // date: string, 
  location: string, 
  description: string, 
  address: string, 
  city: string,  
  zip: string, 
  state: string
) { 
  return axios 
  .post("http://localhost:3001/create-event", {
    event_name: event_name, 
    // date: date, 
    location: location, 
    description: description,  
    address: address, 
    city: city,  
    zip: zip, 
    state: state
  })
  .then((res: AxiosResponse<Event>): Event => { 
    return res.data
  })
}
