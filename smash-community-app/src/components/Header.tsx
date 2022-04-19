import { Button, Grid, Typography } from "@mui/material";
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

  return (
    <Grid container 

      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        my: 2
      }}>
      <Grid item>
        <Typography component="h1" variant="h5">
          Smash Community App
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Grid>
    </Grid>
  );
}
