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
  eventname: string, 
  // date: string, 
  location: string, 
  description: string, 
  isInPerson: string, 
  address: string, 
  city: string, 
  country: string, 
  zip: string, 
  state: string
) { 
  return axios 
  .post("http://localhost:3001/create-event", {
    eventname: eventname, 
    // date: date, 
    location: location, 
    description: description, 
    isInPerson: isInPerson, 
    address: address, 
    city: city, 
    country: country, 
    zip: zip, 
    state: state
  })
  .then((res: AxiosResponse<Event>): Event => { 
    return res.data
  })
}
