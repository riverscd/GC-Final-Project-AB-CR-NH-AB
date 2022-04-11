import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCommunity } from "../services/communities";

export function CreateCommunity() {
  const [communityName, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(communityName);
    AddCommunity(communityName, location, description).then((newCommunity) => {
      if (newCommunity) {
        navigate("/mycommunities");
      }
    });
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
