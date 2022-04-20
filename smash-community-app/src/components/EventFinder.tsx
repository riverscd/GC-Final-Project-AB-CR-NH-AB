import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  GetAllTournaments,
  GetTournamentsByState,
} from "../services/smash-api";
import { GetAllEvents, GetEventsByState } from "../services/events";
import { SmashEvent } from "../models/events";
import { TournamentNode, CompetitionEvent } from "../models/smash";
import userContext from "../contexts/UserContext";
import { AddEventToUser } from "../services/users";
import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Grid,
  Modal,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

export function EventFinder() {
  const { loggedInUser } = useContext(userContext);
  const [allTournaments, setAllTournaments] = useState<any>([]);
  const [allEvents, setAllEvents] = useState<SmashEvent[]>([]);
  const [state, setState] = useState<string | undefined>("");

  useEffect(() => {
    GetAllTournaments().then((data: any) => {
      setAllTournaments(data);
    });
    //this is not firing when user changes value
    GetAllEvents().then((data: any) => {
      setAllEvents(data);
    });
  }, []);

  useEffect(() => {
    if (state !== undefined && state !== "default" && state !== "") {
      GetTournamentsByState(state as string).then((data: any) => {
        setAllTournaments(data);
      });
      GetEventsByState(state as string).then((data: any) => {
        setAllEvents(data);
        console.log(state);
      });
    }
  }, [state]);

  function handleAddEvent(eventId: number) {
    if (loggedInUser) {
      AddEventToUser(loggedInUser?.id, eventId).then((data: any) => {
        console.log(data);
      });
    }
  }
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
        <Box sx={{ m: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography variant="h5" component="h1">
              Tournament and Event Finder
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                m: 2
              }}
            >
              <Typography variant="body1" color="text.secondary"
                sx={{ mr: 2 }}
              >
                Filter by State
              </Typography>
              <select
                onChange={(event) => {
                  setState(event.target.value);
                }}
              >
                <option defaultValue="default">State:</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HA">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Box
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
                Tournaments:
              </Typography>

              {allTournaments.map((tournament: TournamentNode) => (
                <Card
                  variant="outlined"
                  sx={{ mb: 1 ,
                    borderRadius: 2}}>
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="text.secondary">
                      <ul>
                        <li
                          key={tournament.id}
                        >{`tournament name: ${tournament.name}`}</li>
                        <li>{`location: ${tournament.city}, ${tournament.addrState} ${tournament.postalCode}`}</li>
                        <li>{`venue name: ${tournament.venueName}`}</li>
                        <li>{`number of attendees: ${tournament.numAttendees}`}</li>
                        <li>{`has offline events: ${tournament.hasOfflineEvents}`}</li>
                        <li>{`has online events: ${tournament.hasOnlineEvents}`}</li>
                        {tournament.events.map((tournamentEvent: CompetitionEvent) => (
                          <ul>
                            <li>{`competition tier: ${tournamentEvent.competitionTier}`}</li>
                            <li>{`event name: ${tournamentEvent.name}`}</li>
                          </ul>
                        ))}
                      </ul>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1,
                          borderRadius: 1 }}
                      >
                        Add to My Events
                      </Button>
                    </Typography>
                  </CardContent>
                </Card>
              ))}

            </Box>
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
                Events:
              </Typography>
              {allEvents.map((event: any) => (
                <Card
                  variant="outlined"
                  sx={{ mb: 1 ,
                    borderRadius: 2}}>
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      <ul>
                        <li key={event.id}>{`event name: ${event.event_name}`}</li>
                        <li>{`event location: ${event.location}`}</li>
                        <li>{`location details: ${event.city}, ${event.state}`}</li>
                        <li>{`number of attendees: ${event.attendees}`}</li>
                        <li>{`in person event: ${event.is_in_person}`}</li>
                        <li>{`description: ${event.description}`}</li>
                        </ul>
                        <Button
                          sx={{ mt: 2,
                            borderRadius: 1 }}
                          variant="outlined"
                          size="small"
                          onClick={() => handleAddEvent(event.id)}
                        >
                          Add To My Events
                        </Button>
                     
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider >
    //   <Grid container component="main" sx={{ height: "100vh" }}>
    //     <h1>Event and Tournament Finder</h1>
    //     <div>
    //       <select
    //         onChange={(event) => {
    //           setState(event.target.value);
    //         }}
    //       >
    //         <option defaultValue="default">State:</option>
    //         <option value="AL">Alabama</option>
    //         <option value="AK">Alaska</option>
    //         <option value="AZ">Arizona</option>
    //         <option value="AR">Arkansas</option>
    //         <option value="CA">California</option>
    //         <option value="CO">Colorado</option>
    //         <option value="CT">Connecticut</option>
    //         <option value="DE">Delaware</option>
    //         <option value="FL">Florida</option>
    //         <option value="GA">Georgia</option>
    //         <option value="HA">Hawaii</option>
    //         <option value="ID">Idaho</option>
    //         <option value="IL">Illinois</option>
    //         <option value="IN">Indiana</option>
    //         <option value="IA">Iowa</option>
    //         <option value="KS">Kansas</option>
    //         <option value="KY">Kentucky</option>
    //         <option value="LA">Louisiana</option>
    //         <option value="ME">Maine</option>
    //         <option value="MD">Maryland</option>
    //         <option value="MA">Massachusetts</option>
    //         <option value="MI">Michigan</option>
    //         <option value="MN">Minnesota</option>
    //         <option value="MS">Mississippi</option>
    //         <option value="MO">Missouri</option>
    //         <option value="MT">Montana</option>
    //         <option value="NE">Nebraska</option>
    //         <option value="NV">Nevada</option>
    //         <option value="NH">New Hampshire</option>
    //         <option value="NJ">New Jersey</option>
    //         <option value="NM">New Mexico</option>
    //         <option value="NY">New York</option>
    //         <option value="NC">North Carolina</option>
    //         <option value="ND">North Dakota</option>
    //         <option value="OH">Ohio</option>
    //         <option value="OK">Oklahoma</option>
    //         <option value="OR">Oregon</option>
    //         <option value="PA">Pennsylvania</option>
    //         <option value="RI">Rhode Island</option>
    //         <option value="SC">South Carolina</option>
    //         <option value="SD">South Dakota</option>
    //         <option value="TN">Tennessee</option>
    //         <option value="TX">Texas</option>
    //         <option value="UT">Utah</option>
    //         <option value="VT">Vermont</option>
    //         <option value="VA">Virginia</option>
    //         <option value="WA">Washington</option>
    //         <option value="WV">West Virginia</option>
    //         <option value="WI">Wisconsin</option>
    //         <option value="WY">Wyoming</option>
    //       </select>

    //       <h2>Tournaments:</h2>

    //       {allTournaments.map((tournament: TournamentNode) => (
    //         <Card variant="outlined">
    //           <CardContent>
    //             <Typography variant="body1" color="text.secondary">
    //               <ul>
    //                 <li
    //                   key={tournament.id}
    //                 >{`tournament name: ${tournament.name}`}</li>
    //                 <li>{`location: ${tournament.city}, ${tournament.addrState} ${tournament.postalCode}`}</li>
    //                 <li>{`venue name: ${tournament.venueName}`}</li>
    //                 <li>{`number of attendees: ${tournament.numAttendees}`}</li>
    //                 <li>{`has offline events: ${tournament.hasOfflineEvents}`}</li>
    //                 <li>{`has online events: ${tournament.hasOnlineEvents}`}</li>
    //                 {tournament.events.map(
    //                   (tournamentEvent: CompetitionEvent) => (
    //                     <ul>
    //                       <li>{`competition tier: ${tournamentEvent.competitionTier}`}</li>
    //                       <li>{`event name: ${tournamentEvent.name}`}</li>
    //                     </ul>
    //                   )
    //                 )}
    //               </ul>
    //               <button>Add To My Events</button>
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //     <h2>Community Events:</h2>
    //     {allEvents.map((event: any) => (
    //       <Card variant="outlined">
    //         <CardContent>
    //           <Typography variant="body1" color="text.secondary">
    //             <ul>
    //               <li key={event.id}>{`event name: ${event.event_name}`}</li>
    //               <li>{`event location: ${event.location}`}</li>
    //               <li>{`location details: ${event.city}, ${event.state}`}</li>
    //               <li>{`number of attendees: ${event.attendees}`}</li>
    //               <li>{`in person event: ${event.is_in_person}`}</li>
    //               <li>{`description: ${event.description}`}</li>
    //               <button onClick={() => handleAddEvent(event.id)}>
    //                 Add To My Events
    //               </button>
    //             </ul>
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     ))}
    //     <Box>
    //       <Link to="/sitenav">Home</Link>
    //     </Box>
    //   </Grid>
    // </ThemeProvider>
  );
}
