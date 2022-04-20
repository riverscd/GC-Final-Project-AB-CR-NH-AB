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
  console.log(foundMainCharacters);
  const foundSecondaryCharacters: Character[] = characters.filter((character) =>
    loggedInUser?.secondary_characters?.find((characterId) => {
      return characterId === character.id;
    })
  );
  console.log(foundSecondaryCharacters);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
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
            <Card sx={{width: 300,px:5}}>
              <CardContent >
                <Typography variant="h6" color="text.primary" >
                  <ul>
                    <li>
                      Username:
                    </li>
                    <li className="list-item">
                      {`${loggedInUser?.username}`}
                    </li>
                    <li>
                      First Name:
                    </li>
                    <li className="list-item">
                      {`${loggedInUser?.first_name}`}
                    </li>
                    <li>
                      Last Name:
                    </li>
                    <li className="list-item">
                      {`${loggedInUser?.last_name}`}
                    </li>
                    <li>
                      Location:
                    </li>
                    <li className="list-item">
                      {`${loggedInUser?.city}, ${loggedInUser?.state}`}
                    </li>
                    <li>
                      Bio:
                    </li>
                    <li className="list-item">
                      {`${loggedInUser?.bio}`}
                    </li>
                  </ul>

                </Typography>

                <Typography variant="h6" color="text.primary">
                  Main Characters:
                  <ul className="list-item">
                    {mcElements ?? <li>No Characters</li>}</ul>
                </Typography>

                <Typography variant="h6" color="text.primary">
                  Secondaries:
                  <ul className="list-item">{scElements ?? <li>No Characters</li>}</ul>
                </Typography>

                <Typography variant="h6" color="text.primary">
                  Slippi Usernames:
                  <ul>
                    {loggedInUser?.slippi_usernames?.map((slippiusername) => (
                      <li className="list-item">{slippiusername}</li>
                    )) ?? <li>No Slippi Usernames</li>}
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Box>
          </Box>
      </Grid>
    </ThemeProvider>
  );
}
