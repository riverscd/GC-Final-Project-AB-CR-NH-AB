import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { Community } from "../models/communities";
import {
  GetAllCommunities,
  GetCommunitiesByLocation,
} from "../services/communities";
import { AddCommunityToUser } from "../services/users";

export function CommunityFinder() {
  const { loggedInUser } = useContext(userContext);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [location, setLocation] = useState<string | undefined>("");

  useEffect(() => {
    GetAllCommunities().then((data: any) => {
      setAllCommunities(data);
    });
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    GetCommunitiesByLocation(location as string).then(
      (data: Community[]): void => {
        setAllCommunities(data);
      }
    );
  }

  function handleAddCommunity(communityId: number) {
    console.log(communityId);
    if (loggedInUser) {
      AddCommunityToUser(loggedInUser?.id, communityId).then((data: any) => {
        console.log(data);
      });
    }
  }
  useEffect(() => {
    GetCommunitiesByLocation(location as string).then(
      (data: Community[]): void => {
        setAllCommunities(data);
      }
    );
  }, [setLocation]);
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
              Community Finder
            </Typography>

            <Box
              sx={{
                mt: 2,
                mx: 2
              }}>

          <Box
            sx={{
              m: 2,
            }}
          >
         
              <TextField
                label="Search by Location:"
                type="text"
                variant="outlined"
                size="small"
                sx={{ m: 1 }}
                onChange={(e: any) => setLocation(e.target.value)}>
              </TextField>
            
              <Button
                variant="outlined"
                type="submit"
                sx={{ m: 1 ,
                borderRadius: 1}}
                onClick={handleSubmit}>
                Submit
              </Button>

            </Box>
          </Box>
          <Box
          sx={{display:"flex",
          justifyContent: "flex-start",
          ml: 5}}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 1,
              ml: 5
            }}
          >
            Communities:
          </Typography>
          </Box>

          <Box
            sx={{
              mx: 5,
              mb: 5
            }}>
               <ul>
            {allCommunities?.map((community: Community) => (
              <Card
                variant="outlined"
                sx={{ mb: 1,
                  borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="body1"
                    color="text.secondary">
                   
                      <li key={community.id}
                      className= "title">
                        {`${community.community_name}`}
                      </li>
                      <li className= "list-item">Location: {`${community.location}`}</li>
                      <li className= "list-item">Description: {`${community.description}`}</li>
                     
                    <Button
                      sx={{ mt: 2,
                        borderRadius: 1 }}
                       onClick={() => handleAddCommunity(community.id)}
                      variant="outlined"
                      size="small"
                    >
                      Add to My Communities
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            ))}
            </ul>
          </Box>

        </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
