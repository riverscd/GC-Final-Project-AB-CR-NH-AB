import { Link } from "react-router-dom";

export function SiteNavigation() {
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
          <li>
            <Link to="/login">Sign Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
