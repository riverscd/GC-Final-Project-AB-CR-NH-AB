import React from "react";
import logo from "./logo.svg";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "../src/components/Header"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";


function App() {
  const location =useLocation();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  

  if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){ 
    return null 
  } else { 
    return <ThemeProvider theme={darkTheme}> <Container component="main" maxWidth="xs">
    <CssBaseline /><Header /></Container></ThemeProvider>
  }
}

export default App;
