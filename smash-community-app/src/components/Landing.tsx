import React from "react";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div>
      <h1>Smash Melee Community</h1>
      <button>login</button>
      <button>signup</button>

      <p>These links are here temporarily for while I'm building stuff
        i plan to remove them so alexis can work out routes properly
        but i might forget and leave it so pls delete if i do
      </p>

      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
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
          <Link to="/eventfinder">Event Finder</Link>
        </li>
        <li>
          <Link to="/myprofile">My Profile</Link>
        </li>
        <li>
          <Link to="/communityeventmanager">Community/Event Manager</Link>
        </li>
      </ul>




    </div>
  );
}
