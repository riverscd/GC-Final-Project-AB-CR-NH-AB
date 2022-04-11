import { Link, useNavigate } from "react-router-dom";

export function CommunityEventManager() {
  const navigate = useNavigate();

  function handleCreateCommunity() {
    navigate("/CommunityForm");
  }

  function handleCreateEvent() {
    navigate("/EventForm");
  }

  return (
    <div>
      <h1>Community and Event Manager</h1>
      <button className="button" type="submit" onClick={handleCreateCommunity}>
        Create a Community
      </button>
      <button className="button" type="submit" onClick={handleCreateEvent}>
        Create an Event
      </button>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
