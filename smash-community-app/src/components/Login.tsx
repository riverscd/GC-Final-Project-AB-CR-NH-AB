import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { User } from "../models/users";
import { LoginUser } from "../services/users";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiLink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Smashbackground from "../images/Smashbackground.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loggedInUser, addUser } = useContext(UserContext);
  const initialValues = {
    username: "",
    password: "",
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    LoginUser(username, password).then((user: User) => {
      if (user) {
        addUser(user);
        console.log(loggedInUser);
        navigate("/SiteNav");
      }
    });
  }
  //const theme = createTheme();
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
            username: Yup.string()
              .min(5, "Username should be of minimum 5 characters length")
              .max(10, "Username cannot be longer than 10 characters")
              .required("Username is required"),
            password: Yup.string()
              .min(8, "Password should be of minimum 8 characters length")
              .max(30, "Password cannot be longer than 30 characters")
              .required("Password is required"),
          })}
          onSubmit={(values) => {
            console.log(values);
            LoginUser(values.username, values.password).then((user) => {
              if (user) {
                addUser(user);
                navigate("/");
              } else {
              }
            });
          }}
        />
        <Grid
          item
          xs={12}
          // sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          //sx={{ maxWidth: { xs: 500, md: 400 } }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              //maxWidth: { xs: 350, md:250}
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/*   <LockOutlinedIcon /> */}
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                {/* <Grid item xs>
                  <MuiLink href="/signup" variant="body2">
                    Forgot password?
                  </MuiLink>
                </Grid> */}
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
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
      </Grid>
    </ThemeProvider>
  );
}
