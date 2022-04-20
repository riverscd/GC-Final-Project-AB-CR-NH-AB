import UserContext from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { User } from "../models/users";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MuiLink from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function SiteNavigation() {
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser !== undefined)
      window.localStorage.setItem("user", JSON.stringify(loggedInUser));
  }, []);
  console.log(loggedInUser);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main">
        <CssBaseline />
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mx: 4,
                display: "flex",
                flexDirection: "column",
               
              }}
            >
              <Typography component="h1" variant="h5" sx={{mb:1}}>
                Explore
              </Typography>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/generalmessageboard"}
                  >
                    General Message Board
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/communityfinder"}
                  >
                    Community Finder
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/eventfinder"}
                  >
                    Event Finder
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/communityeventmanager"}
                  >
                    Community and Event Creator
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                mx: 4,
                mt: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h5" sx={{mb:1}}>
                My Stuff
              </Typography>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/myevents"}
                  >
                    My Events
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/mycommunities"}
                  >
                    My Communities
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/myprofile"}
                  >
                    My Profile
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
          
        </Grid>
      </Container>
    </ThemeProvider>

  );
}
