import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllTournaments } from "../services/smash-api";

export function EventFinder() {
  const [allTournaments, setAllTournaments] = useState<any>([]);

  useEffect(() => {
    GetAllTournaments().then((data: any) => {
      setAllTournaments(data);
    });
  }, []);

  return (
    <div>
      <h1>Event and Tournament Finder</h1>
      <div>
        {allTournaments.map((tournament: any) => (
          <ul>
            <li>{`tournament name: ${tournament.name}`}</li>
            <li>{`location: ${tournament.city}, ${tournament.state} ${tournament.postalCode}`}</li>
            <li>{`venue name: ${tournament.venueName}`}</li>
            <li>{`number of attendees: ${tournament.numAttendees}`}</li>
            <li>{`has offline events: ${tournament.hasOfflineEvents}`}</li>
            <li>{`has online events: ${tournament.hasOnlineEvents}`}</li>
            <li>{`${tournament.events}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
