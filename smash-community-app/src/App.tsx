import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Header } from "../src/components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7o_Sqm14vJfkvNJrnZe3NmEdLkDjHCTA",
  authDomain: "smashcomm-df67b.firebaseapp.com",
  projectId: "smashcomm-df67b",
  storageBucket: "smashcomm-df67b.appspot.com",
  messagingSenderId: "494704830927",
  appId: "1:494704830927:web:3ac44586bd9b1e2d5b4aba",
  measurementId: "G-WSF989DPQ3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const navigate = useNavigate();

  const location = useLocation();
  const { loggedInUser, checkLoginStatus } = useContext(UserContext);

  useEffect(() => {
    if (!checkLoginStatus()) {
      navigate("/");
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    
  });

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) {
    return null;
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        {" "}
        <Container component="main" >
          <CssBaseline />
          <Header />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
