import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../services/Login";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    LoginUser(username, password).then((data: any) => {
      if (data) console.log(data);
    });
    navigate("/SiteNav");
  }

  return (
    <div className="loginContainer">
      <form>
        <p>Welcome Back to the Smash Melee Community</p>
        <label>
          <p>Email:</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
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

      <Link to="/SignUp">Don't have an account? Sign Up</Link>
    </div>
  );
}
