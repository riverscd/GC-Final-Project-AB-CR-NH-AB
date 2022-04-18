import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Community } from "../models/communities";
import {SmashEvent} from "../models/events"
import { GetCommunitiesByCreator } from "../services/communities";
import { GetEventsByCreator } from "../services/events";

export function CommunityEventManager() {
  const navigate = useNavigate();
  const [createdCommunities, setCreatedCommunities] = useState<Community[]>([]); 
  const [createdEvents, setCreatedEvents] = useState<SmashEvent[]>([]); 
  const {loggedInUser} = useContext(UserContext)

  function handleCreateCommunity() {
    navigate("/CommunityForm");
  }

  function handleCreateEvent() {
    navigate("/EventForm");
  }

  useEffect(() => { 
    GetCommunitiesByCreator(loggedInUser!.id).then((data: Community[]) => { 
      setCreatedCommunities(data)
    })
    GetEventsByCreator(loggedInUser!.id).then((data: SmashEvent[]) => { 
      setCreatedEvents(data)
    })
  }, []);

  return (
    <div>
      <h1>Community and Event Manager</h1>
      <button className="button" type="submit" onClick={handleCreateCommunity}>
        Create a Community
      </button>
      <button className="button" type="submit" onClick={handleCreateEvent}>
        Create an Event
      </button>
      <p>My Communities:</p>
      <div>
      {createdCommunities.map((community: Community) => (
        <ul>
          <li key={community.id}>
          Community Name: {`${community.community_name}`}</li>
            <li>Location: {`${community.location}`}</li>
            <li>Description: {`${community.description}`}
          </li>
        </ul>
      ))}
      </div>
      <p>My Events:</p>
      <div>
      {createdEvents.map((event: SmashEvent) => (
        <ul>
          <li key={event.id}>
          Event Name: {`${event.event_name}`}</li>
            <li>Location: {`${event.location}`}</li>
            <li>Description: {`${event.description}`}</li>
        </ul>
      ))}
      </div>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
