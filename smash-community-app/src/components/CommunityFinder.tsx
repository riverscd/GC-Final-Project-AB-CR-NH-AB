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

  GetCommunitiesByLocation(location as string).then(
    (data: Community[]): void => {
      setAllCommunities(data);
    }
  );

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

          <Box
            sx={{
              mx: 5,
              mb: 5
            }}>
            {allCommunities?.map((community: Community) => (
              <Card
                variant="outlined"
                sx={{ mb: 1,
                  borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="body1"
                    color="text.secondary">
                    <ul>
                      <li key={community.id}>
                        Community Name: {`${community.community_name}`}
                      </li>
                      <li>Location: {`${community.location}`}</li>
                      <li>Description: {`${community.description}`}</li>
                      <button onSubmit={() => handleAddCommunity(community.id)}>
                        Join Community
                      </button>
                    </ul>
                    <Button
                      sx={{ mt: 2,
                        borderRadius: 1 }}
                      variant="outlined"
                      size="small"
                    >
                      Add to My Communities
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Link to="/sitenav">Home</Link>
        </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
