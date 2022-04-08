import { ReactNode, useState } from "react";
import { Event } from "../models/events";
import { TournamentNode } from "../models/smash";

export function MyEventsContextProvider(props: { children: ReactNode }) {
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  function addEvent(event: Event | TournamentNode) {
    !myEvents.some((addedEvent: Event | TournamentNode): boolean => {
      return addedEvent.id === event.id;
    });
  }
}
