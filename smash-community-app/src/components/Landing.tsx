import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  function handleLogin(e: any) {
    navigate("/Login");
  }

  function handleSignUp(e: any) {
    navigate("/SignUp");
  }
  return (
    <div>
      <h1>Smash Melee Community</h1>
      <button className="button" type="submit" onClick={handleLogin}>
        login
      </button>
      <button className="button" type="submit" onClick={handleSignUp}>
        signup
      </button>

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
