import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    navigate("/CommunityEvents");
  }

  return (
    <form>
      <p>Create an Event</p>
      <label>
        <p>Event Name:</p>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <p>Event Date:</p>
        <input type="text" onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        <p>Event Location:</p>
        <input type="text" onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        <p>Event Description:</p>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button className="button" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

// NOTES: add a message that tells the user the event has been submitted, do we actually want to navigate to community events after?
