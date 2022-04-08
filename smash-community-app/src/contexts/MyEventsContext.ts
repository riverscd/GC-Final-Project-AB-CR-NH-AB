import { createContext } from "react";
import { Event } from "../models/users";

interface MyProfileContext {
  events: Event[];
  addEvent: (event: Event) => void;
}

const defaultValue: MyEventsContext = {
  events: [],
  addEvent: () => {},
};

const MyEventsContext = createContext<MyEventsContext>(defaultValue);
export default MyEventsContext;
