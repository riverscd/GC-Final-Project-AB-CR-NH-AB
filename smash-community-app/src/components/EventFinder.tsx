import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllTournaments } from "../services/smash-api";
import { GetAllEvents } from "../services/events";
import { Events } from "../models/events";

export function EventFinder() {
  const [allTournaments, setAllTournaments] = useState<any>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    GetAllTournaments().then((data: any) => {
      setAllTournaments(data);
    });
  }, []);

  useEffect(() => {
    GetAllEvents().then((data: any) => {
      setAllEvents(data);
    });
  }, []);

  return (
    <div>
      <h1>Event and Tournament Finder</h1>
      <div>
        {allTournaments.map((tournament: any) => (
          <ul>
            <li key={tournament.id}>{`tournament name: ${tournament.name}`}</li>
            <li>{`location: ${tournament.city}, ${tournament.state} ${tournament.postalCode}`}</li>
            <li>{`venue name: ${tournament.venueName}`}</li>
            <li>{`number of attendees: ${tournament.numAttendees}`}</li>
            <li>{`has offline events: ${tournament.hasOfflineEvents}`}</li>
            <li>{`has online events: ${tournament.hasOnlineEvents}`}</li>
            <li>{`${tournament.events}`}</li>
          </ul>
        ))}
      </div>
      <div>
        {allEvents.map((event: any) => (
          <ul>
            <li key={event.id}>{`event name: ${event.name}`}</li>
            <li>{`event location: ${event.location}`}</li>
            <li>{`location details: ${event.city}, ${event.state} ${event.postalCode}`}</li>
            <li>{`number of attendees: ${event.numAttendees}`}</li>
            <li>{`in person event: ${event.is_in_person}`}</li>
            <li>{`description: ${event.description}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
