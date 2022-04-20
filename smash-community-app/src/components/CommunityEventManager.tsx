import { Box, Button, Card, CardContent, createTheme, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Community } from "../models/communities";
import { SmashEvent } from "../models/events"
import { GetCommunitiesByCreator } from "../services/communities";
import { GetEventsByCreator } from "../services/events";

export function CommunityEventManager() {
  const navigate = useNavigate();
  const [createdCommunities, setCreatedCommunities] = useState<Community[]>([]);
  const [createdEvents, setCreatedEvents] = useState<SmashEvent[]>([]);
  const { loggedInUser } = useContext(UserContext)

  function handleCreateCommunity() {
    navigate("/CommunityForm");
  }

  function handleCreateEvent() {
    navigate("/EventForm");
  }

  useEffect(() => {
    GetCommunitiesByCreator(loggedInUser!.id).then((data: Community[]) => {
      setCreatedCommunities(data)
    })
    GetEventsByCreator(loggedInUser!.id).then((data: SmashEvent[]) => {
      setCreatedEvents(data)
    })
  }, []);

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
              Community and Event Manager
            </Typography>
            <Box
              sx={{
                m: 4,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",

              }}
            >
              <Button sx={{ mr: 2 }}
                variant="contained"
                type="submit"
                onClick={handleCreateCommunity}>
                Create a Community
              </Button>
              <Button sx={{ ml: 2 }}
                variant="outlined"
                type="submit" onClick={handleCreateEvent}>
                Create an Event
              </Button>
            </Box>
          </Box>
          <Box
          sx={{
            mx:5,
            mb:5}}> 
      
          <Box>
            <Typography component="h2" variant="h6"
            sx={{
              my:2,
              mr:2
            }}>
              My Created Communities:
            </Typography>

            {createdCommunities.map((community: Community) => (
              <Card variant="outlined" sx={{mb:1}}>
                {/* <div className="message"> */}
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    <ul>
                      <li key={community.id} className="title">
                        {`${community.community_name}`}</li>
                      <li className="list-item">Location: {`${community.location}`}</li>
                      <li className="list-item">Description: {`${community.description}`}
                      </li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box>
            <Typography component="h2" variant="h6"
            sx={{
              my:2,
              mr:2
            }}>
              My Created Events:
            </Typography>

            {createdEvents.map((event: SmashEvent) => (
              <Card variant="outlined" sx={{mb:1}}>
                {/* <div className="message"> */}
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    <ul>
                      <li key={event.id} className="title">
                        {`${event.event_name}`}</li>
                       
                      <li className="list-item">Location: {`${event.location}`}</li>
                   
                      <li className="list-item">Description: {`${event.description}`}</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
