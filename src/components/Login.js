import React, { Component } from "react";
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


class Login extends Component {
  emptyItem = {
    email: "",
    password: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      student: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginStudent = this.loginStudent.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.toForgotPass = this.toForgotPass.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  loginStudent(id, password) {
    //implement attemping to get the first to see if it exists before sending them to dashboard
    StudentService.loginStudent(id, password).then( res => {
      this.props.history.push(`/students/landingpage/${id}`);
    }).catch(function (error) {
      alert("Incorrect email or password");
      console.log(error.toJSON());
    });
  }

  toRegister() {
    this.props.history.push('/students/new/')
  }

  toForgotPass() {
    //implement attemping to get the first to see if it exists before sending them to dashboard
    this.props.history.push(`/students/enteremail`);
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
                          align-items="center"
                          justify-content="center"
                          sx={{ padding: 10 }}>
            <Typography
                color="secondary"
                variant="h3"
                fontWeight={700}
              >
                Welcome to BOILERADVSR
              </Typography>
              <Typography
                color="text"
                variant="h6"
                fontWeight={400}
              >
                Your virtual Purdue advisor.
              </Typography>
            </Container>
            <Container
              component="main"
              maxwidth="xs"
              align-items="center"
              justify-content="center"
              sx={{ padding: 0 }}
            >
              <Typography
                color="secondary"
                variant="h3"
                fontWeight={700}
                style={{paddingBottom: 35}}
              >
                Sign In
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
                    color="secondary"
                    focused
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
                    variant="filled"
                    type="password"
                    name="password"
                    id="password"
                    value={item.password}
                    onChange={this.handleInputChange}
                    autoComplete="password"
                    color="secondary"
                    focused
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
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: 10 }}
                    onClick={() => this.loginStudent(item.email, item.password)}
                    className="btn btn-info"
                  >
                    <Typography color="primary">Log In</Typography>
                  </Button>
                </FormGroup>
                <Typography variant="h6" fontWeight={500}>New user? <Link onClick={ () => this.toRegister()} underline="hover" color="secondary">Sign up here</Link></Typography>
                <Typography variant="h6" fontWeight={500}>Forgot your password? <Link underline="hover" color="secondary" onClick={ () => this.toForgotPass()}>Reset here</Link></Typography>
              </Form>
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    );
  }
}

export default Login;
