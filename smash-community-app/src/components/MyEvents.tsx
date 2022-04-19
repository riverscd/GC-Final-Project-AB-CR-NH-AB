import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { timeStamp } from "console";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { SmashEvent } from "../models/events";
import { GetEventsByCreator, GetMultipleEventsById } from "../services/events";

export function MyEvents() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { loggedInUser } = useContext(userContext);
  const [usersCreatedEvents, setUsersCreatedEvents] = useState<SmashEvent[]>();
  const [usersJoinedEvents, setUsersJoinedEvents] = useState<any[]>([]);

  useEffect(() => {
    if (loggedInUser?.id) {
      GetEventsByCreator(loggedInUser?.id).then((data: SmashEvent[]) => {
        console.log(data);
        setUsersCreatedEvents(data);
      });
    }
    if (loggedInUser?.added_event_ids) {
      GetMultipleEventsById(loggedInUser.added_event_ids).then((data: any) => {
        setUsersJoinedEvents(data);
      });
    }
  }, []);

  return (
    <div>
      <h1>My Events and Tournaments</h1>

      <label>
        <h2>Created Events:</h2>

        <ul>
          {usersCreatedEvents?.map((createdEvent) => (
            <li key={createdEvent.id}>
              <h3>{createdEvent.event_name}</h3>
              <p>{createdEvent.is_in_person ? "In Person" : "Online"} Event</p>
              <p>{createdEvent.event_date}</p>
              <p>{`${createdEvent.address} ${createdEvent.city}, ${createdEvent.state} ${createdEvent.zip}`}</p>
              {/* <p>Number of attendees: {createdEvent.attendees.length}</p> */}
              <p>{createdEvent.description}</p>
              <button>Edit Event</button>
            </li>
          ))}
        </ul>
      </label>
      <label>
        <h2>Joined Events:</h2>

        <ul>
          {usersJoinedEvents?.map((createdEvent) => (
            <li key={createdEvent.id}>
              <h2>{createdEvent.event_name}</h2>
              <p>{createdEvent.is_in_person ? "In Person" : "Online"} Event</p>
              <p>{createdEvent.event_date}</p>
              <p>{`${createdEvent.address} ${createdEvent.city}, ${createdEvent.state} ${createdEvent.zip}`}</p>
              {/* <p>Number of attendees: {createdEvent.attendees.length}</p> */}
              <p>{createdEvent.description}</p>
            </li>
          ))}
        </ul>
      </label>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
