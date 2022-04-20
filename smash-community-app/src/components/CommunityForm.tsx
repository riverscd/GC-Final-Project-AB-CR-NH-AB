import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddCommunity } from "../services/communities";
import UserContext from "../contexts/UserContext";
import * as Yup from "yup";
import Smashbackground from "../images/Smashbackground.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
// import loggedInUser from "../contexts/UserContext"

export function CreateCommunity() {
  // const [communityName, setName] = useState("");
  // const [location, setLocation] = useState("");
  // const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);

  const initialValues = {
    communityName: "",
    location: "",
    description: "",
  };

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   AddCommunity(
  //     communityName,
  //     location,
  //     description,
  //     loggedInUser!.id
  //     ).then((newCommunity) => {
  //     if (newCommunity) {
  //       navigate("/mycommunities");
  //     }
  //   });
  // }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={Yup.object({
            communityName: Yup.string()
              .min(2, "Community name must be at least 2 characters")
              .max(50, "Community name cannot be longer than 50 characters")
              .required("Community Name is required"),
            location: Yup.string()
              .min(1, "Location must be at least 1 character")
              .max(100, "Location name cannot be longer than 100 characters"),
            description: Yup.string()
              .min(1, "Description must be at least 1 character")
              .max(500, "Description cannot be longer than 500 characters")
              .required("Description is required"),
          })}
          onSubmit={(values: any) => {
            console.log(values);
            AddCommunity(
              values.communityName,
              values.location,
              values.description,
              loggedInUser!.id
            ).then((newCommunity) => {
              if (newCommunity) {
                //  addUser(user);
                navigate("/communityeventmanager");
              }
            });
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            touched,
            values,
          }) => (
            <Grid
              item
              xs={12}
              // sm={8}
              md={4}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create a Community
                </Typography>
                <Box
                  component="form"
                  noValidate
                  // autoComplete="off"
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(
                          touched.communityName && errors.communityName
                        )}
                        fullWidth
                        required
                        helperText={
                          touched.communityName && errors.communityName
                        }
                        label="Community Name"
                        id="communityName"
                        name="communityName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.communityName}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.location && errors.location)}
                        fullWidth
                        required
                        helperText={touched.location && errors.location}
                        label="Event Location"
                        id="location"
                        name="location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.location}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        fullWidth
                        required
                        helperText={touched.description && errors.description}
                        label="Event Description"
                        id="description"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.description}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Grid>
          )}
        </Formik>

        <Grid
          item
          xs={false}
          // sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${Smashbackground})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "fit",
            backgroundPosition: "center",
          }}
        />
        {/* <Link to="/sitenav">Back to Home</Link> */}
      </Grid>
    </ThemeProvider>
  );
}
