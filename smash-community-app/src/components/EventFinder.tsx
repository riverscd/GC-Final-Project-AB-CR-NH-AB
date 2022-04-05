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
            <li>{`${tournament.name}`}</li>
            <li>{`${tournament.slug}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
