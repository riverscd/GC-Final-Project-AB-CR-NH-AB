import { ReactNode, useState } from "react";
import { Event } from "../models/events";

export function MyEventsContextProvider(props: { children: ReactNode }) {
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  function addEvent(event: Event) {
    !myEvents.some((addedEvent: Event): boolean => {
      return addedEvent.id === event.id;
    });
  }
}
