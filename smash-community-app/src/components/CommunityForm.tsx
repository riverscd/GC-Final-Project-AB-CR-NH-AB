import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateCommunity() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    navigate("/CommunityFinder");
  }

  return (
    <form>
      <p>Create a Community</p>
      <label>
        <p>Community Name:</p>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <p>Community Region:</p>
        <input type="text" onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        <p>Community Description:</p>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button className="button" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
