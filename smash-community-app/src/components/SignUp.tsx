import { useState } from "react";
import { Link } from "react-router-dom";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
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
