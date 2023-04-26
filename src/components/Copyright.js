import { Component } from "react";
import { Typography, Link } from "@mui/material";

class Copyright extends Component {
  render() {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" href="https://boileradvsr.com/">
          BoilerAdvsr
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}

export default Copyright;