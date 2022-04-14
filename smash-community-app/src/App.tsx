import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Header } from "../src/components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";

function App() {
  const navigate = useNavigate();

  const location = useLocation();
  const { checkLoginStatus } = useContext(UserContext);
  useEffect(() => {
    if (!checkLoginStatus()) {
      navigate("/");
    }

    //checkLoginStatus();
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Header />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
