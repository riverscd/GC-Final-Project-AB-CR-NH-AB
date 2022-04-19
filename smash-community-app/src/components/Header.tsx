import { Button, Grid } from "@mui/material";
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
        justifyContent: "space-between"
      }}>
      <h2>Smash Community App</h2>
    
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
  );
}
