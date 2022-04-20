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
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Smashbackground from "../images/Smashbackground.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const invalidLoginError = () =>
//   toast.error("Invalid Username or Password", {
//     position: "top-right",
//     autoClose: 900,
//     hideProgressBar: true,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <MuiLink color="inherit" href="https://mui.com/">
//         Your Website
//       </MuiLink>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

export default function SignInSide() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loggedInUser, addUser } = useContext(UserContext);
  const initialValues = {
    username: "",
    password: "",
  };

  const invalidLoginError = () =>
    toast.error("Invalid Username or Password", {
      position: "top-left",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   LoginUser(username, password).then((user: User) => {
  //     if (user) {
  //       addUser(user);
  //       console.log(loggedInUser);
  //       navigate("/SiteNav");
  //     }
  //   });
  // }
  //const theme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    // <ToastContainer>
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <ToastContainer
          position="top-left"
          autoClose={900}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
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
            LoginUser(values.username, values.password)
              .then((user) => {
                if (user) {
                  addUser(user);
                  navigate("/sitenav");
                }
              })
              .catch((error) => {
                if (error.response.status === 401) {
                  invalidLoginError();
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
              elevation={4}
              square
              //sx={{ maxWidth: { xs: 500, md: 400 } }}
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
                  error={Boolean(touched.username && errors.username)}
                  margin="normal"
                  required
                  fullWidth
                  helperText={touched.username && errors.username}
                  id="username"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  autoComplete="current-password"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // onChange={(e) => setPassword(e.target.value)}
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
                {/* <Copyright sx={{ mt: 5 }} /> */}
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
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
    // </ToastContainer>
  );
}
