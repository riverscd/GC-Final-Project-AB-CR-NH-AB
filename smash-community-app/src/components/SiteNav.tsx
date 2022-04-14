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
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleSignOut() {
    logoutUser();
    console.log(loggedInUser);
    navigate("/login");
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
                    to={"/generalmessageboard"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
                  >
                    General Message Board
                  </Link>
                </Grid>
              </Grid>
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
                  <Link
                    to={"/eventfinder"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
                  >
                    Event Finder
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/communityeventmanager"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
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
                alignItems: "left",
              }}
            >
              <Typography component="h1" variant="h5">
                My Stuff
              </Typography>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/myevents"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
                  >
                    My Events
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    to={"/mycommunities"}
                    // variant="inherit"
                    // color="inherit"
                    // underline="none"
                  >
                    My Communities
                  </Link>
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
