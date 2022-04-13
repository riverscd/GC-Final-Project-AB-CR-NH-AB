import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import {useContext} from "react";
import { User } from "../models/users";

export function SiteNavigation() {
  const { loggedInUser, removeUser } = useContext(UserContext); 
  const navigate = useNavigate();

  function handleSignOut() { 
    removeUser(loggedInUser as User)
    navigate("/login")
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/mycommunities">My Communities</Link>
          </li> 
         <li>
            <Link to="/communityfinder">Community Finder</Link>
          </li> 
           <li>
            <Link to="/myevents">My Events</Link>
          </li>
          <li>
            <Link to="/myprofile">My Profile</Link>
          </li>
          <li>
            <Link to="/eventfinder">Event Finder</Link>
          </li>
          <li>
            <Link to="/communityeventmanager">Community/Event Manager</Link>
          </li>
        </ul>
        <button type="submit" onClick={handleSignOut}>Sign Out</button>
      </nav>
    </div>
  );
}
