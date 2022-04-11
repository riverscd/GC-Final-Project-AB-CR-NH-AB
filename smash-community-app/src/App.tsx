import React from "react";
import logo from "./logo.svg";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "../src/components/Header"

function App() {
  const location =useLocation();

  if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){ 
    return null 
  } else { 
    return <Header />
  }
}

export default App;
