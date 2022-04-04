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
        {allTournaments.tournaments.nodes.map((tournament: any) => (
          <li>{`${tournament.name}`}</li>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
