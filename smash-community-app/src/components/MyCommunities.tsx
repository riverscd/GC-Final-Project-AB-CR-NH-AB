import { Box, Card, CardContent, createTheme, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { Community } from "../models/communities";
import {
  GetCommunitiesByCreator,
  GetMultipleCommunitiesById,
} from "../services/communities";

export function MyCommunities() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { loggedInUser } = useContext(userContext);
  const [usersCreatedCommunities, setUsersCreatedCommunities] =
    useState<Community[]>();
  const [usersJoinedCommunities, setUsersJoinedCommunities] = useState<any[]>(
    []
  );

  useEffect(() => {
    if (loggedInUser?.id) {
      GetCommunitiesByCreator(loggedInUser?.id).then((data: Community[]) => {
        console.log(data);
        setUsersCreatedCommunities(data);
      });
    }
    if (loggedInUser?.added_community_ids) {
      GetMultipleCommunitiesById(loggedInUser.added_community_ids).then(
        (data: any) => {
          setUsersJoinedCommunities(data);
        }
      );
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
              Communities
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
                Created Communities
              </Typography>

              <ul>
                {usersCreatedCommunities?.map((createdCommunity) => (
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 1,
                      borderRadius: 2
                    }}>

                    <CardContent>
                      <Typography variant="body1" color="text.secondary">
                      <li key={createdCommunity.id}>
                        <h3>{createdCommunity.community_name}</h3>
                        <p>{createdCommunity.location}</p>
                        <p>{createdCommunity.description}</p>
                        <button>Edit Community</button>
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
              Joined Communities
            </Typography>

            <ul>
              {usersJoinedCommunities?.map((createdCommunity) => (
                <Card
                  variant="outlined"
                  sx={{
                    mb: 1,
                    borderRadius: 2
                  }}>
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      <li key={createdCommunity.id}>
                        <h3>{createdCommunity.community_name}</h3>
                        <p>{createdCommunity.location}</p>
                        <p>{createdCommunity.description}</p>
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
