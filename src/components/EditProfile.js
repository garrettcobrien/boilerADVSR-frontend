import { Component } from "react";
import { Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import {
  Container,
  CssBaseline,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  Grid,
  ListItem,
  List,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Stack
} from "@mui/material";
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import AddIcon from "@mui/icons-material/Add";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import theme from "../theme";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

class EditProfile extends Component {
  emptyItem = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    linkedIn: "",
    aboutMe: "",
    profilePicture: "",
    validate: {
      emailState: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},
      item: this.emptyItem,
      planOfStudy: {},
      degree: "",
      type: "",
      dep: "",
      departments: [""],
      degrees: [],
      hasChanged: false,
      empty: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDep = this.handleChangeDep.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.search = this.search.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
  }

  componentDidMount() {
    console.log("edit");
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
      this.setState({ item: res.data });
    });
    StudentService.getPlanofStudy(this.state.id).then((res) => {
      this.setState({ planOfStudy: res.data });
    });
    APIService.getDepartments().then((res) => {
      this.setState({ departments: res.data });
    });
    this.forceUpdate();
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    this.setState({ hasChanged: true });
  }

  handleChangeDep(e) {
    this.setState({ dep: e.target.value });
  }
  handleChangeType(e) {
    this.setState({ type: e.target.value });
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

  handleSubmit(student, id) {
    StudentService.updateStudent(student, id).then((res) => {
      this.setState({ student: res.data });
    });
    this.props.history.push(`/students/dashboard/${id}`);
  }

  saveInfo() {
    StudentService.updateStudent(this.state.item, this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
    this.setState({ hasChanged: false });
  }

  removeDegree(id, degree, text) {
    StudentService.changeDegree(id, degree, text).then((res) => {
      this.setState({ departments: res.data });
    });
    //this.forceUpdate();
  }

  search(dep, type) {
    APIService.getDegreeList(dep, type).then((res) => {
      this.setState({ degrees: res.data });
    });
  }

  render() {
    const {
      student,
      item,
      id,
      isLoading,
      planOfStudy,
      type,
      degree,
      dep,
      departments,
      degrees,
    } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => this.handleSubmit(student, id)}
            sx={{ marginLeft: 4, marginTop: 4 }}
          >
            Back to Dashboard
          </Button>{" "}
          <Container
            maxwidth="xs"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: 5, marginLeft: 10 }}
          >
            <Typography
              color="secondary"
              variant="h3"
              fontWeight={700}
              sx={{ marginBottom: 5 }}
            >
              Edit Profile
            </Typography>
            {/* Profile Details */}
            <Form>
              <FormGroup>
                <TextField
                  label="First Name"
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  value={item.firstName || ""}
                  onChange={this.handleChange}
                  autoComplete="firstName"
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
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
                        <BadgeOutlinedIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
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
                  value={item.email || ""}
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
                        <MailOutlineIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  sx={{ marginLeft: 5 }}
                  value={item.password || ""}
                  onChange={this.handleChange}
                  autoComplete="password"
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="About Me"
                  type="aboutMe"
                  name="aboutMe"
                  id="aboutMe"
                  value={item.aboutMe || ""}
                  onChange={this.handleChange}
                  autoComplete="aboutMe"
                  color="secondary"
                  focused
                  style={{ width: "505px" }}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="LinkedIn"
                  type="linkedIn"
                  name="linkedIn"
                  id="linkedIn"
                  value={item.linkedIn || ""}
                  onChange={this.handleChange}
                  style={{ width: "505px" }}
                  autoComplete="linkedIn"
                  color="secondary"
                  focused
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Profile Picture"
                  type="profilePicture"
                  name="profilePicture"
                  id="profilePicture"
                  value={item.profilePicture || ""}
                  onChange={this.handleChange}
                  autoComplete="profilePicture"
                  color="secondary"
                  focused
                  style={{ width: "505px" }}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon
                          fontSize="small"
                          sx={{ color: "#ffffff" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                <Button
                  variant="contained"
                  disabled={!this.state.hasChanged}
                  color="secondary"
                  type="button"
                  onClick={() => this.saveInfo()}
                >
                  Save
                </Button>
              </Grid>
            </Form>
            <Grid container spacing={3}>
              {/* Add Degrees */}
              <Grid
                item
                xs={6}
                md={6}
                lg={6}
                sx={{ justifyContent: "left", verticalAlign: "top" }}
              >
                <Form>
                  <Typography
                    color="secondary"
                    variant="h4"
                    fontWeight={700}
                    sx={{ marginBottom: 2 }}
                  >
                    Add Degrees
                  </Typography>
                  <FormGroup>
                    {/* Adding more degrees */}
                    <Container>
                      <Stack>
                        <TextField
                          select
                          id="category"
                          style={{ marginTop: 2, width: 250 }}
                          displayEmpty
                          label="Department"
                          value={dep}
                          onChange={this.handleChangeDep}
                        >
                          <MenuItem value="">Department</MenuItem>
                          {departments &&
                            departments.map((department) => (
                              <MenuItem
                                color="primary"
                                key={department}
                                value={department}
                              >
                                {" "}
                                {department}{" "}
                              </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                          select
                          sx={{ marginTop: 2, width: 250 }}
                          label="Degree Type"
                          displayEmpty
                          value={type}
                          onChange={(e) => this.handleChangeType(e)}
                        >
                          <MenuItem value="">Type</MenuItem>
                          <MenuItem key="major" value="MAJOR">
                            Major
                          </MenuItem>
                          <MenuItem key="minor" value="MINOR">
                            Minor
                          </MenuItem>
                          <MenuItem key="concentration" value="CONCENTRATION">
                            Concentration
                          </MenuItem>
                        </TextField>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          sx={{ fontSize: 20, marginTop: 2, width: 250 }}
                          onClick={() => this.search(dep, type)}
                        >
                          Search
                        </Button>
                      </Stack>
                    </Container>
                    <Table style={{ maxWidth: "400px" }}>
                      <TableBody>
                        {degrees &&
                          degrees.map((degree) => (
                            <TableRow>
                              <TableCell>
                                {degree.degreeTitle}{" "}
                                <IconButton
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  type="submit"
                                  onClick={() =>
                                    this.removeDegree(
                                      id,
                                      degree.degreeTitle,
                                      "true"
                                    )
                                  }
                                >
                                  <AddIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </FormGroup>
                </Form>
              </Grid>
              {/* Current Degrees */}
              <Grid item xs={6} md={6} lg={6}>
                <Form>
                  <Typography
                    color="secondary"
                    variant="h4"
                    fontWeight={700}
                    sx={{ marginBottom: 2 }}
                  >
                    Current Degrees
                  </Typography>
                  <Table style={{ maxWidth: "400px" }}>
                    <TableBody>
                      {/* Getting degrees */}
                      {planOfStudy.degrees?.map((degree) => (
                        <TableRow>
                          <TableCell>
                            {degree.degreeTitle}{"  |  "}{degree.degreeType}{" "}
                            <Button
                              color="secondary"
                              type="submit"
                              onClick={() =>
                                this.removeDegree(
                                  id,
                                  degree.degreeTitle,
                                  "false"
                                )
                              }
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Form>
              </Grid>
            </Grid>
            <Form>
              <Button
                sx={{ marginTop: 5 }}
                variant="contained"
                color="secondary"
                type="submit"
                onClick={() => this.handleSubmit(student, id)}
              >
                Update Profile
              </Button>{" "}
            </Form>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default EditProfile;
