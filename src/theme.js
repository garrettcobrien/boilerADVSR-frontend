import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b1b1b",
    },
    secondary: {
      main: "#EBD99F",
      dark: "#DDB945"
    },
    text: {
      primary: "#ffffff",
      secondary:  "#EBD99F"
    },
    background: {
      default: "#1b1b1b",
      paper: "#2c2c2c",
    },
  },
  typography: {
    fontFamily: ["Inter Tight", "sans-serif"].join(","),
  },
});

export default theme;
