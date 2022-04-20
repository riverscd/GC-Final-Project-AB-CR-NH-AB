import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";



export function Header() {
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleSignOut() {
    logoutUser();
    console.log(loggedInUser);
    navigate("/login");
  }
  function handleHome() {
    navigate("/sitenav")
  }

  return (
    <Grid container

      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        my: 1
      }}>
      <Grid item>
        <Typography component="h1" variant="h5"
        >
          Smash Community App
        </Typography>
      </Grid>
      <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        my: 2
      }}> 
      
      <Grid item>
        <Button
        sx={{mr:1,
        borderRadius:1}}
        size="small"
          variant="outlined"
          onClick={handleHome}
        >
          Home
        </Button>
      </Grid>
      <Grid item>
        <Button
        sx={{ml:1,
          borderRadius:1}}
        size="small"
          variant="outlined"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Grid>
      </Box>
     
    </Grid>
  );
}
