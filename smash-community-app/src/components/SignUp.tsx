import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../services/users";
import UserContext from "../contexts/UserContext";
//material ui imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <MuiLink color="inherit" href="https://mui.com/">
//         Your Website
//       </MuiLink>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


export function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  }
  

  // function handleChange(){
    
  // }

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     SignUpUser(
  //       email,
  //       username,
  //       firstName,
  //       lastName,
  //       password,
  //       birthdate
  //     ).then((user) => {
  //       if (user) {
  //         addUser(user);
  //         navigate("/");
  //       }
  //     });
  //   }
  // }
  // const WithMaterialUI = () => {
  //   const formik = useFormik({

  //  const validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (

    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={Yup.object({
            email: Yup
              .string()
              .email('Enter a valid email')
              .required('Email is required'),
            username: Yup
              .string()
              .min(5, 'Username should be of minimum 5 characters length')
              .max(10, 'Username cannot be longer than 10 characters')
              .required('Username is required'),
            firstname: Yup
              .string()
              .min(2, 'First name should be of minimum 2 characters length')
              .max(30, 'First name cannot be longer than 30 characters')
              .required('First name is required'),
            lastname: Yup
              .string()
              .min(2, 'Last name should be of minimum 8 characters length')
              .max(30, 'Last name cannot be longer than 30 characters')
              .required('Last name is required'),
            birthdate: Yup
              .string()
              .min(8, 'Enter valid birthdate')
              .required('Birthdate is required'),
            password: Yup
              .string()
              .min(8, 'Password should be of minimum 8 characters length')
              .max(30, 'Password cannot be longer than 30 characters')
              .required('Password is required'),
            confirmPassword: Yup
              .string()
              .oneOf([Yup.ref('password')], 'Password does not match')
              .required('Confirm Password is required')
          })}
          onSubmit={(values) => {
            console.log(values);
            // if (password === confirmPassword) {
            //   SignUpUser(
            //     email,
            //     username,
            //     firstName,
            //     lastName,
            //     password,
            //     birthdate
            //   ).then((user) => {
            //     // if (user) {
            //     //   // addUser(user);
            //     //   // navigate("/");
            //     // }
            //   });
            // } 
          }}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            touched,
            values
          }) => (

            <form autoComplete="off" noValidate onSubmit={handleSubmit}>

              <Box
                sx={{
                  mt: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        name="username"
                        fullWidth
                        required
                        helperText={touched.username && errors.username}
                        label="Username"
                        id="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.username}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onChange={(e: any) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.birthdate && errors.birthdate)}
                        fullWidth
                        required
                        helperText={touched.birthdate && errors.birthdate}
                        label="Birth Date"
                        id="birthday"
                        name="birthdate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="date"
                        value={setBirthdate(values.birthdate)}
                        variant="outlined"
                        size="small"

                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onSubmit={(e: any) => {
                      //   setBirthdate(e.target.value);
                      // }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        required
                        helperText={touched.email && errors.email}
                        label="Email"
                        id="email"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={setEmail(values.email)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onSubmit={(e: any) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        required
                        helperText={touched.firstName && errors.firstName}
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={setFirstName(values.firstName)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onSubmit={(e: any) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="family-name"
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        required
                        helperText={touched.lastName && errors.lastName}
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={setLastName(values.lastName)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onSubmit={(e: any) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        required
                        helperText={touched.password && errors.password}
                        label="Password"
                        id="password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={setPassword(values.password)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onSubmit={(e: any) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        fullWidth
                        required
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        label="Confirm Password"
                        id="password"
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={setConfirmPassword(values.confirmPassword)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onChange={(e: any) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={Boolean(!isValid)}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link to="/login">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>

                </Box>
              </Box>

            </form>
          )}
        </Formik>

      </Container>
    </ThemeProvider >

  );

}
