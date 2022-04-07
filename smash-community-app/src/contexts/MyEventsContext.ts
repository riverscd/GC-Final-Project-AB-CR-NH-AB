import { createContext } from "react";
import { Event } from "../models/events";

interface MyEventsContext {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: number) => void;
}

const defaultValue: MyEventsContext = {
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
};

const MyEventsContext = createContext<MyEventsContext>(defaultValue);
export default MyEventsContext;
