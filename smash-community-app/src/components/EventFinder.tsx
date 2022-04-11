import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllTournaments } from "../services/smash-api";
import { GetAllEvents } from "../services/events";
import { Events } from "../models/events";
import { TournamentNode, CompetitionEvent } from "../models/smash";

export function EventFinder() {
  const [allTournaments, setAllTournaments] = useState<any>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    GetAllTournaments().then((data: any) => {
      setAllTournaments(data);
    });
    GetAllEvents().then((data: any) => {
      setAllEvents(data);
    });
  }, []);

  return (
    <div>
      <h1>Event and Tournament Finder</h1>
      <div>
        {allTournaments.map((tournament: TournamentNode) => (
          <div>
            <ul>
              <li
                key={tournament.id}
              >{`tournament name: ${tournament.name}`}</li>
              <li>{`location: ${tournament.city}, ${tournament.state} ${tournament.postalCode}`}</li>
              <li>{`venue name: ${tournament.venueName}`}</li>
              <li>{`number of attendees: ${tournament.numAttendees}`}</li>
              <li>{`has offline events: ${tournament.hasOfflineEvents}`}</li>
              <li>{`has online events: ${tournament.hasOnlineEvents}`}</li>
              {tournament.events.map((tournamentEvent: CompetitionEvent) => (
                <ul>
                  <li>{`competition tier: ${tournamentEvent.competitionTier}`}</li>
                  <li>{`event name: ${tournamentEvent.name}`}</li>
                </ul>
              ))}
            </ul>

            <button></button>
          </div>
        ))}
      </div>
      <div>
        {allEvents.map((event: any) => (
          <ul>
            <li key={event.id}>{`event name: ${event.event_name}`}</li>
            <li>{`event location: ${event.location}`}</li>
            <li>{`location details: ${event.city}, ${event.state}`}</li>
            <li>{`number of attendees: ${event.attendees}`}</li>
            <li>{`in person event: ${event.is_in_person}`}</li>
            <li>{`description: ${event.description}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
