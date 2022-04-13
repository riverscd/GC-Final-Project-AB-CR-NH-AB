import UserContext from "../contexts/UserContext";
import { useContext } from "react";
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
  const { loggedInUser, removeUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(loggedInUser);
  function handleSignOut() {
    //removeUser(loggedInUser as User);
    navigate("/login");
    console.log(loggedInUser);
  }

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
                alignItems: "left",
              }}
            >
              <Typography component="h1" variant="h5">
                Explore
              </Typography>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/communityfinder"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
                  >
                    Community Finder
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <MuiLink
                    href="/eventfinder"
                    variant="inherit"
                    color="inherit"
                    underline="none"
                  >
                    Event Finder
                  </MuiLink>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <MuiLink
                    href="/communityeventmanager"
                    variant="inherit"
                    color="inherit"
                    underline="none"
                  >
                    Community and Event Creator
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                mx: 4,
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography component="h1" variant="h5">
                My Stuff
              </Typography>
              <Grid container>
                <Grid item>
                  <MuiLink
                    href="/myevents"
                    variant="inherit"
                    color="inherit"
                    underline="none"
                  >
                    My Events
                  </MuiLink>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <MuiLink
                    href="/mycommunities"
                    variant="inherit"
                    color="inherit"
                    underline="none"
                  >
                    My Communities
                  </MuiLink>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/myprofile"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
                  >
                    My Profile
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Button
                    sx={{
                      mt: 2,
                    }}
                    variant="outlined"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Grid>
      </Container>
    </ThemeProvider>

    // <div>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/mycommunities">My Communities</Link>
    //       </li>
    //      <li>
    //         <Link to="/communityfinder">Community Finder</Link>
    //       </li>
    //        <li>
    //         <Link to="/myevents">My Events</Link>
    //       </li>
    //       <li>
    //         <Link to="/myprofile">My Profile</Link>
    //       </li>
    //       <li>
    //         <Link to="/eventfinder">Event Finder</Link>
    //       </li>
    //       <li>
    //         <Link to="/communityeventmanager">Community/Event Manager</Link>
    //       </li>
    //       <li>
    //         <Link to="/login">Sign Out</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
}
