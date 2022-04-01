import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <div className="loginContainer">
      <form>
        <p>Welcome Back to the Smash Melee Community</p>
        <label>
          <p>Email:</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password:</p>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </label>
      </form>

      <div>
        <button className="button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <Link to="/">Home</Link>
    </div>
  );
}
