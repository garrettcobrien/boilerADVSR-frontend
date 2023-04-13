import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  Box,
  CssBaseline,
  TextField,
  InputAdornment,
  Link
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "../theme.js";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import StudentService from "../services/StudentService.js";

class ResetPasswordEnterEmail extends Component {
  emptyItem = {
    email: "",
    password: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.toLogin = this.toLogin.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  toLogin() {
    //implement attemping to get the first to see if it exists before sending them to dashboard
    this.props.history.push(`/`);
  }

  forgotPassword(id) {
    StudentService.getStudentById(id).then( res => {
        StudentService.resetPasswordLink(id);
        alert("Request to change password has been set!");
        this.toLogin();
    }).catch(function (error) {
        alert("Account does not exist");
        console.log(error.toJSON());
    });
}

  render() {
    const { item } = this.state;
    return (
      <div>
        <Box alignItems="center" justifyContent="center">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                          maxwidth="xs"
                          alignItems="center"
                          justifyContent="center"
                          sx={{ padding: 10 }}>
            <Typography
                color="secondary"
                variant="h3"
                fontWeight={700}
              >
                Forgot your password?
              </Typography>
              <Typography
                color="text"
                variant="h6"
                fontWeight={400}
                style={{paddingBottom: 35}}
              >
                We'll send you a link to reset it.
              </Typography>
              <Form>
                <FormGroup>
                  <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    name="email"
                    id="email"
                    value={item.email}
                    onChange={this.handleInputChange}
                    autoComplete="email"
                    color="text"
                    focused
                    sx={{ width: '25ch' }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon fontSize="small" color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px", marginTop: 10 }}
                    onClick={() => this.forgotPassword(item.email)}
                    className="btn btn-info"
                  >
                    <Typography color="primary">Reset</Typography>
                  </Button>
                </FormGroup>
              </Form>
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    );
  }
}

export default ResetPasswordEnterEmail;
