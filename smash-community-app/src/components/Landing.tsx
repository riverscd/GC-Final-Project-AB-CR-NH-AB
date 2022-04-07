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
      <button className="button" type="submit" onClick={handleLogin}>
        login
      </button>
      <button className="button" type="submit" onClick={handleSignUp}>
        signup
      </button>
    </div>
  );
}
