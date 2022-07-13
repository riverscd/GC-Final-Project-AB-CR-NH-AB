import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { User } from "../models/users";
import { Character, characters } from "../models/characters";
import { Box, Button, Card, CardContent, createTheme, Grid, Paper, ThemeProvider, Typography } from "@mui/material";

export function MyProfile() {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const foundMainCharacters: Character[] = characters.filter((character) =>
    loggedInUser?.main_character?.find((characterId) => {
      return characterId === character.id;
    })
  );

  const foundSecondaryCharacters: Character[] = characters.filter((character) =>
    loggedInUser?.secondary_characters?.find((characterId) => {
      return characterId === character.id;
    })
  );

  const mcElements: JSX.Element[] = foundMainCharacters?.map(
    (character: Character) => (
      <li key={character.id}>
        <img
          className="characterImages"
          alt={character.character_name}
          src={require(`../images/characterIcons/${character.imgSrc}.png`)}
        />
        {character.character_name}
      </li>
    )
  );

  function handleNav() {
    navigate("/editprofile")
  }

  const scElements: JSX.Element[] = foundSecondaryCharacters?.map(
    (character: Character) => (
      <li key={character.id}>
        <img
          className="characterImages"
          alt={character.character_name}
          src={require(`../images/characterIcons/${character.imgSrc}.png`)}
        />
        {character.character_name}
      </li>
    )
  );

  // loggedInUser?.main_character?.map((chartacterId) => {
  //   setFoundCharacters([
  //     ...foundCharacters,
  //     characters.find((character) => chartacterId === character.id),
  //     console.log(foundCharacters),
  //   ]);
  // });


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
         <Card
        variant="outlined"
        sx={{ mx:10,
          borderRadius: 2}}>
          <CardContent>
        <Box 
        sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: 'center'
          }}>
          <Typography component="h1" variant="h5"
            sx={{ mb: 2 }}
          >
            My Profile
          </Typography>

          <Button
            variant="outlined"
            sx={{ mb: 2, borderRadius: 1 }}
            onClick={handleNav}>

            Edit Profile
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
             
            }}>
            {/* <Card sx={{width: 300,px:5}}>
              <CardContent > */}
                <Typography align="center" variant="h5" color="text.primary" >
                  <ul>
                    <li className="profile">
                      Username: {`${loggedInUser?.username}`}
                    </li>
                    
                    <li className="profile">
                      First Name: {`${loggedInUser?.first_name}`}
                   
                    </li>
                    <li className="profile">
                      Last Name: {`${loggedInUser?.last_name}`}
                   
                    </li>
                    <li className="profile">
                      Location: {`${loggedInUser?.city}, ${loggedInUser?.state}`}
                    </li>
                    
                    <li className="profile">
                      Bio: {`${loggedInUser?.bio}`}
                    </li>
                    
                  </ul>

                </Typography>

                <Typography align="center" variant="h5" color="text.primary">
                  <ul className="list-item">
                  <li  className="profile"> Main Characters:
                  {mcElements ?? "No Characters"} </li>
                
                  <li  className="profile"> Secondaries:
                  {scElements ?? "No Characters"}</li>
              

                
                  Slippi Usernames:
                    {loggedInUser?.slippi_usernames?.map((slippiusername) => (
                      <li  className="profile">{slippiusername}</li>
                    )) ?? <li className="profile"> No Slippi Usernames</li>}
                  </ul>
                </Typography>
              {/* </CardContent>
            </Card> */}
          </Box>
          </Box>
          </Box>
          </CardContent>
    </Card>
      </Grid>
    </ThemeProvider>
  );
}
