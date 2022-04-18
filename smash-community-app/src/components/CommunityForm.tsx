import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddCommunity } from "../services/communities";
import UserContext from "../contexts/UserContext"
// import loggedInUser from "../contexts/UserContext"

export function CreateCommunity() {
  const [communityName, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {loggedInUser} = useContext(UserContext)
  
  function handleSubmit(e: any) {
    e.preventDefault();
    AddCommunity(communityName, location, description, loggedInUser!.id).then((newCommunity) => {
      if (newCommunity) {
        navigate("/mycommunities");
      }
    });
  }

  return (
  <div>
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
    <Link to="/sitenav">Back to Home</Link>
    </div>
  );
}
