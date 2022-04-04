import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    navigate("/SiteNav");
  }

  return (
    <div className="SignUpContainer">
      <form>
        <p>Sign Up</p>
        <label>
          <p>Email:</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Username:</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>First Name:</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name:</p>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <div>
          <button className="button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>

      <Link to="/">Home</Link>
    </div>
  );
}
