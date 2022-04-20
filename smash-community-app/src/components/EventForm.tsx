import { Avatar, Box, Button, createTheme, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { AddEvent } from "../services/events";
import { SignUpUser } from "../services/users";
import * as Yup from 'yup';
import Smashbackground from "../images/Smashbackground.png";
import { Formik, Field, Form, ErrorMessage } from 'formik';


// NOTES: add a message that tells the user the event 
//has been submitted, do we actually want to navigate 
//to community events after?

export function CreateEvent() {
  // const [eventName, setEventName] = useState("");
  // const [date, setDate] = useState("");
  // const [location, setLocation] = useState("");
  // const [description, setDescription] = useState("");
  // const [isInPerson, setIsInPerson] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");
  // const [zip, setZip] = useState("");
  // const [state, setState] = useState("");
  const { loggedInUser } = useContext(UserContext);

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

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   console.log(date);
  //   AddEvent(
  //     eventName,
  //     date,
  //     location,
  //     description,
  //     address,
  //     city,
  //     zip,
  //     state, 
  //     loggedInUser!.id
  //   ).then((newEvent) => {
  //     if (newEvent) {
  //       navigate("/myevents");
  //     }
  //   });
  // }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (

    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={Yup.object({
            eventName: Yup
              .string()
              .min(2, 'Event name must be at least 2 characters')
              .max(50, 'Event name cannot be longer than 50 characters')
              .required('Event Name is required'),
            date: Yup
              .string()
              .min(8, 'Enter a valid date')
              .required('Date is required'),
            location: Yup
              .string()
              .min(1, 'Location must be at least 1 character')
              .max(100, 'Location name cannot be longer than 100 characters'),
            description: Yup
              .string()
              .min(1, 'Description must be at least 1 character')
              .max(500, 'Description cannot be longer than 500 characters')
              .required('Description is required'),
            address: Yup
              .string()
              .min(1, 'Address must be at least 1 character')
              .max(100, 'Address cannot be longer than 100 characters'),
            city: Yup
              .string()
              .min(1, 'City should be at least 1 character')
              .max(30, 'City cannot be longer than 30 characters'),
            zip: Yup
              .string()
              .min(5, 'Zip should be 5 characters')
              .max(5, 'Zip should be 5 characters'),
            state: Yup
              .string()
              .min(2, 'Please enter 2 character state: Example "MI"')
              .max(2, 'Please enter 2 character state: Example "MI"'),
          })}

          onSubmit={(values: any) => {
            console.log(values);
            AddEvent(
              values.eventName,
              values.date,
              values.location,
              values.description,
              values.address,
              values.city,
              values.zip,
              values.state,
              loggedInUser!.id
            ).then((newEvent) => {
              if (newEvent) {
                //  addUser(user);
                navigate("/communityeventmanager");
              }
            });
          }}>

          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            touched,
            values
          }) => (
            <Grid
              item
              xs={12}
              // sm={8}
              md={4}
              component={Paper}
              elevation={6}
              square
            >

              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
               
                <Typography component="h1" variant="h5">
                  Create an Event
                </Typography>
                <Box
                  component="form"
                  noValidate
                  // autoComplete="off"  
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.eventName && errors.eventName)}
                        fullWidth
                        required
                        helperText={touched.eventName && errors.eventName}
                        label="Event Name"
                        id="eventName"
                        name="eventName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.eventName}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.date && errors.date)}
                        fullWidth
                        required
                        helperText={touched.date && errors.date}
                        label="Event Date"
                        id="date"
                        name="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="date"
                        value={values.date}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.location && errors.location)}
                        fullWidth
                        required
                        helperText={touched.location && errors.location}
                        label="Event Location"
                        id="location"
                        name="location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.location}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        required
                        helperText={touched.description && errors.description}
                        label="Event Description"
                        id="description"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.description}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        required
                        helperText={touched.address && errors.address}
                        label="Address"
                        id="address"
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.address}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        required
                        helperText={touched.city && errors.city}
                        label="City"
                        id="city"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.city}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.zip && errors.zip)}
                        fullWidth
                        required
                        helperText={touched.zip && errors.zip}
                        label="Zip"
                        id="zip"
                        name="zip"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.zip}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.state && errors.state)}
                        fullWidth
                        required
                        helperText={touched.state && errors.state}
                        label="State"
                        id="state"
                        name="state"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.state}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>


                </Box>
              </Box>
            </Grid>
          )}
        </Formik>


        <Grid
          item
          xs={false}
          // sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${Smashbackground})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "fit",
            backgroundPosition: "center",
          }}
        />
        
      </Grid>
    </ThemeProvider >
  );
}


