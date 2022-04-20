import { Box, Card, CardContent, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { timeStamp } from "console";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { SmashEvent } from "../models/events";
import { GetEventsByCreator, GetMultipleEventsById } from "../services/events";

export function MyEvents() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { loggedInUser } = useContext(userContext);
  const [usersCreatedEvents, setUsersCreatedEvents] = useState<SmashEvent[]>();
  const [usersJoinedEvents, setUsersJoinedEvents] = useState<any[]>([]);

  useEffect(() => {
    if (loggedInUser?.id) {
      GetEventsByCreator(loggedInUser?.id).then((data: SmashEvent[]) => {
        console.log(data);
        setUsersCreatedEvents(data);
      });
    }
    if (loggedInUser?.added_event_ids) {
      GetMultipleEventsById(loggedInUser.added_event_ids).then((data: any) => {
        setUsersJoinedEvents(data);
      });
    }
  }, []);


  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        item
        xs={12}
        // sm={8}
        component={Paper}
        elevation={6}
        sx={{
          py: 2,
        }}
      >

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Typography component="h1" variant="h5"
            >
              Events and Tournaments
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 5,
                mb: 5
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 1 }}
              >
                Created Events
              </Typography>
              <ul>
                {usersCreatedEvents?.map((createdEvent) => (
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 1,
                      borderRadius: 2
                    }}>

                    <CardContent>
                      <Typography variant="body1" color="text.secondary">

                        <li key={createdEvent.id}>
                          <h3>{createdEvent.event_name}</h3>
                          <p>{createdEvent.is_in_person ? "In Person" : "Online"} Event</p>
                          <p>{createdEvent.event_date}</p>
                          <p>{`${createdEvent.address} ${createdEvent.city}, ${createdEvent.state} ${createdEvent.zip}`}</p>
                         
                          <p>{createdEvent.description}</p>
                         
                        </li>

                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </ul>

            </Box> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
              >
                Joined Events
              </Typography>



              <ul>
                {usersJoinedEvents?.map((createdEvent) => (
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 1,
                      borderRadius: 2
                    }}>
                    <CardContent>
                      <Typography variant="body1" color="text.secondary">
                        <li key={createdEvent.id}>
                          <h2>{createdEvent.event_name}</h2>
                          <p>{createdEvent.is_in_person ? "In Person" : "Online"} Event</p>
                          <p>{createdEvent.event_date}</p>
                          <p>{`${createdEvent.address} ${createdEvent.city}, ${createdEvent.state} ${createdEvent.zip}`}</p>
                          {/* <p>Number of attendees: {createdEvent.attendees.length}</p> */}
                          <p>{createdEvent.description}</p>
                        </li>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider >
  );
}
