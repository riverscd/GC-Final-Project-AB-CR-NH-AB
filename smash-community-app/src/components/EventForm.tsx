import { Button, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
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
  const {loggedInUser} = useContext(UserContext);

  const navigate = useNavigate();

  const initialValues = {
    eventName: '',
    date: '',
    location: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  }

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
      state, 
      loggedInUser!.id
    ).then((newEvent) => {
      if (newEvent) {
        navigate("/myevents");
      }
    });
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
    <form>
      <p>Create an Event</p>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField
            // error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            required
            // helperText={touched.lastName && errors.lastName}
            label="Event Name"
            id="eventName"
            name="eventName"
            // onBlur={handleBlur}
            // onChange={handleChange}
            type="text"
            // value={values.lastName}
            variant="outlined"
            size="small"
            InputLabelProps={{
            shrink: true,
            }}
          />
      </Grid>
      {/* <label>
        <p>Event Name:</p>
        <input type="text" onChange={(e) => setEventName(e.target.value)} />
      </label> */}
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
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 3, mb: 2 }}
        >  Submit
      </Button>
    </form>
    <Link to="/sitenav">Back to Home</Link>
    </Grid>
  );
}

// NOTES: add a message that tells the user the event has been submitted, do we actually want to navigate to community events after?
