import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

export function MyEvents() {

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  return (
    
    <div>
      <h1>My Events and Tournaments</h1>

      <Link to="/sitenav">Home</Link>
    </div>
    
  );
}
