import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { Container, ThemeProvider } from "@mui/system";
import AppNavbar from "./AppNavbar";
import StudentService from "../services/StudentService";
import { Typography, Button, CssBaseline, TextField, InputAdornment, Link } from "@mui/material";
import theme from "../theme";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from '@mui/icons-material/Password';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
class Register extends Component {
  emptyItem = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    validate: {
      emailState: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toLogin = this.toLogin.bind(this);
  }

  //create handle change for each input
  handleChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  validateEmail(e) {
    const emailRex = /[a-z0-9]@purdue\.edu$/;

    const { validate } = this.state.item;

    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }

    this.setState({ validate });
  }

  toLogin() {
    //implement attemping to get the first to see if it exists before sending them to dashboard
    this.props.history.push(`/`);
  }

  handleSubmit(item) {
    /* Send them too create their profile page */
    if (item.validate.emailState === "has-success" && item.email === item.confirmEmail && item.password === item.confirmPassword) {
      const temp = {};
      StudentService.getStudentById(item.email).then((res) => {
          temp = res.data;
      }).catch((reason) => {
          if (reason.response.status !== 200) {
          StudentService.createStudent(item).then((res) => {
            this.setState({ student: res.data });
          });
          this.props.history.push(`/`);
        }
        else {
          alert("Email already in use");
        }
      });
    }
    else {
      console.log("ERROR");
      alert("Invaild Credentials");
    }
  }

  render() {
    const { item } = this.state;
    return (
      <div>
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
                New to BOILERADVSR?
              </Typography>
              <Typography
                color="text"
                variant="h6"
                fontWeight={400}
              >
                Let's set up your account.
              </Typography>
            </Container>
          <Container sx={{ padding: 0 }}>
          <Typography
                color="secondary"
                variant="h3"
                fontWeight={700}
                style={{paddingBottom: 35}}
              >
                Sign Up
              </Typography>
            <Form>
              <FormGroup>
                <TextField
                  label="First Name"
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  value={item.firstName || ""}
                  onChange={this.handleChange}
                  autoComplete="firstname"
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon fontSize="small" sx={{color: '#ffffff'}} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Last Name"
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  value={item.lastName || ""}
                  onChange={this.handleChange}
                  autoComplete="lastname"
                  color="secondary"
                  focused
                  sx={{ marginLeft: 5 }}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon fontSize="small" sx={{color: '#ffffff'}} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  valid={item.validate.emailState === "has-success"}
                  invalid={item.validate.emailState === "has-danger"}
                  value={item.email || ''}
                  onChange={(e) => {
                    this.validateEmail(e);
                    this.handleChange(e);
                  }}
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon fontSize="small" sx={{color: '#ffffff'}} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Email"
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  sx={{ marginLeft: 5 }}
                    value={item.confirmEmail || ''}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon fontSize="small" sx={{color: '#ffffff'}} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  value={item.password || ""}
                  onChange={this.handleChange}
                  autoComplete="password"
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon fontSize="small" sx={{color: '#ffffff'}} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                    value={item.confirmPassword || ""}
                    onChange={this.handleChange}
                  autoComplete="password"
                  color="secondary"
                  focused
                  sx={{ marginLeft: 5 }}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon fontSize="small" sx={{color: '#ffffff'}} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  style={{ marginTop: 10 }}
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => this.handleSubmit(item)}                  
                >
                  <Typography color="primary">Submit</Typography>
                </Button>{" "}
                
              </FormGroup>
              <Typography variant="h6" fontWeight={500}>Already have an account? <Link onClick={() => this.toLogin()} underline="hover" color="secondary">Return to login</Link></Typography>
            </Form>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}
export default withRouter(Register);
