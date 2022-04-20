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
          <Typography variant="h5" component="h1">
            Community Finder
          </Typography>

          <Box
            sx={{
              m: 2,
            }}
          >
            <form>
              <TextField
                label="Search by Location:"
                type="text"
                variant="outlined"
                size="small"
                sx={{ m: 2 }}
                onChange={(e: any) => setLocation(e.target.value)}
              ></TextField>
              <Button
                variant="outlined"
                type="submit"
                sx={{ m: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </form>
          </Box>

          <Box>
            {allCommunities?.map((community: Community) => (
              <Card variant="outlined">
                {/* <div className="message"> */}
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
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
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Link to="/sitenav">Home</Link>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
