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
import { useFormik} from 'formik';
import * as yup from 'yup';

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
const validationSchema = yup.object({
    email: yup
    .string('Enter your email')
    .email('Enter a valid email'),
    username: yup
    .string('Enter your username')
    .min(5, 'Username should be of minimum 5 characters length')
    .max(10, 'Username cannot be longer than 10 characters')
    .required('Username is required'),
    firstname: yup
    .string('Enter your First name')
    .min(2, 'First name should be of minimum 2 characters length')
    .max(30, 'First name cannot be longer than 30 characters')
    .required('First name is required'),
    lastname: yup
    .string('Enter your Last name')
    .min(2, 'Last name should be of minimum 8 characters length')
    .max(30, 'Last name cannot be longer than 30 characters')
    .required('Last name is required'),
    birthdate: yup
    .string('Enter your birthdate')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
    password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(30, 'Password cannot be longer than 30 characters')
    .required('Password is required'),
    confirmpassword: yup
    .string('Confirm your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(30, 'Password cannot be longer than 30 characters')
    .required('Password is required'),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      username: 'johndoe',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: '12-07-2000',
      password: 'foobarrr',
      confirmpassword: 'foobarrr',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(birthdate);
    if (password === confirmPassword) {
      SignUpUser(
        email,
        username,
        firstName,
        lastName,
        password,
        birthdate
      ).then((user) => {
        if (user) {
          addUser(user);
          navigate("/");
        }
      });
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={formik.values.username}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="birthdate"
                  label="Birth Date"
                  type="date"
                  id="birthday"
                  value={formik.values.birthdate}
                  error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                  helperText={formik.touched.birthdate && formik.errors.birthdate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                    console.log(birthdate);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstname}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastname}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <MuiLink href="/login" variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
    // <div className="SignUpContainer">
    //   <form>
    //     <p>Sign Up</p>
    //     <label>
    //       <p>Email:</p>
    //       <input type="text" onChange={(e) => setEmail(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>Username:</p>
    //       <input type="text" onChange={(e) => setUsername(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>First Name:</p>
    //       <input type="text" onChange={(e) => setFirstName(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>Last Name:</p>
    //       <input type="text" onChange={(e) => setLastName(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>Birth Date:</p>
    //       <input
    //         type="date"
    //         onChange={(e) => {
    //           setBirthdate(e.target.value);
    //           console.log(birthdate);
    //         }}
    //       />
    //     </label>
    //     <label>
    //       <p>Password</p>
    //       <input
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </label>
    //     <label>
    //       <p>Confirm Password</p>
    //       <input
    //         type="password"
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </label>
    //     <div>
    //       <button className="button" type="submit" onClick={handleSubmit}>
    //         Submit
    //       </button>
    //     </div>
    //   </form>

    //   <Link to="/">Back</Link>
    // </div>
  );
}
