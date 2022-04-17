import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddEvent } from "../services/events";

export function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isInPerson, setIsInPerson] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(date);
    AddEvent(
      eventName,
      date,
      location,
      description,
      address,
      city,
      zip,
      state
    ).then((newEvent) => {
      if (newEvent) {
        navigate("/myevents");
      }
    });
  }

  return (
    <div>
    <form>
      <p>Create an Event</p>
      <label>
        <p>Event Name:</p>
        <input type="text" onChange={(e) => setEventName(e.target.value)} />
      </label>
      <label>
        <p>Event Date:</p>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        <p>Event Location Name:</p>
        <input type="text" onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        <p>Event Location Address:</p>
        <p>Street Address:</p>
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        <p>City:</p>
        <input type="text" onChange={(e) => setCity(e.target.value)} />
        <p>State:</p>
        <input type="text" onChange={(e) => setState(e.target.value)} />
        <p>Zip Code:</p>
        <input type="number" onChange={(e) => setZip(e.target.value)} />
      </label>
      <label>
        <p>Event Description:</p>
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

// NOTES: add a message that tells the user the event has been submitted, do we actually want to navigate to community events after?
