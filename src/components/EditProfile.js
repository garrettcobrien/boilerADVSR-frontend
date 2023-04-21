import { Form, FormGroup, Label, FormFeedback } from "reactstrap";
import { MenuItem, Input } from "@mui/material";
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
import { Component } from "react";
import Copyright from "./Copyright";
import CourseService from "../services/CourseService";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HelpIcon from "@mui/icons-material/Help";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Carousel from "react-material-ui-carousel";
import borders from "@mui/system";

import {
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Paper,
  Grid,
  Container,
  Button,
  ButtonGroup,
  Card,
  ButtonBase,
  ListItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Circle,
  ConstructionOutlined,
  QuestionAnswer,
  ReplayCircleFilledOutlined,
  Reply,
  ReplyOutlined,
} from "@mui/icons-material";
import ChatService from "../services/ChatService";
import ReviewCard from "./ReviewCard";
import QuestionCard from "./QuestionCard";
import CourseCard from "./CourseCard";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./RecievedMessage";
import Navbar from "./Navbar";

class EditProfile extends Component {
    emptyItem = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        linkedIn: '',
        aboutMe: '',
        profilePicture: '',
        validate: {
            emailState: '',
        },
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDep = this.handleChangeDep.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.search = this.search.bind(this);
  }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: this.emptyItem,
            planOfStudy: {},
            degree: '',
            type: '',
            dep: '',
            departments: [""],
            degrees: [],
            hasChanged: false
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
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let student = { ...this.state.student };
    student[name] = value;
    console.log("render");
    this.setState({hasChanged: true});
    this.setState({ student });
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
        StudentService.updateStudent(this.state.student, this.state.id).then( res => {
            this.setState({student: res.data});
        });
        this.setState({hasChanged: false});
    }

    removeDegree(id, degree, text) {
        StudentService.changeDegree(id, degree, text).then((res) => {
            this.setState({departments: res.data});
        });
        //this.forceUpdate();
    }

  removeDegree(id, degree, text) {
    StudentService.changeDegree(id, degree, text).then((res) => {
      this.setState({ departments: res.data });
    });
    this.forceUpdate();
  }

  }
  
  search(dep, type) {
    APIService.getDegreeList(dep, type).then((res) => {
      this.setState({ degrees: res.data });
    });
  }

  render() {
    const {
      student,
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
          <Box sx={{ display: "flex" }}>
            <Navbar id={this.state.id}/>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />

              <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                {/* Bottom Containers and Papers */}
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  <Grid item xs={6} md={6} lg={6}>
                    {/* Title */}
                    <Paper
                      sx={{
                        p: 2,
                        flexDirection: "column",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                        marginBottom: 2,
                      }}
                      elevation={8}
                    >
                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <Typography
                            variant="h3"
                            color="secondary"
                            fontWeight={700}
                          >
                            Edit Profile
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>
                    </Paper>
                    {/* Degree List */}
                    <Paper
                      sx={{
                        p: 2,
                        flexDirection: "column",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      elevation={8}
                    >
                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                        <Grid item xs={10} md={10} lg={10}>
                          <Typography
                            variant="h4"
                            color="secondary"
                            fontWeight={700}
                          >
                            Manage Degrees
                          </Typography>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                      </Grid>

                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                        <Grid item xs={5} md={5} lg={5}>
                          <List>
                            <ListItem>
                              Degree 1 <Button>Delete</Button>
                            </ListItem>
                            <ListItem>
                              Degree 1 <Button>Delete</Button>
                            </ListItem>
                            <ListItem>
                              Degree 1 <Button>Delete</Button>
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={5} md={5} lg={5}>
                          <FormControl fullWidth>
                            <Select
                              color="secondary"
                              label="Department"
                              value={dep}
                              onChange={(e) => this.handleChangeDep(e)}
                              sx={{ marginBottom: 2 }}
                            >
                              <MenuItem>CS</MenuItem>
                              <MenuItem>Math</MenuItem>
                            </Select>
                            <Select
                              color="secondary"
                              label="Degree Type"
                              sx={{ marginBottom: 2 }}
                            >
                              <MenuItem>Major</MenuItem>
                              <MenuItem>Minor</MenuItem>
                              <MenuItem>Concentration</MenuItem>
                            </Select>
                            <Button sx={{ backgroundColor: "#EBD99F" }}>
                              Search
                            </Button>
                          </FormControl>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        flexDirection: "column",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      elevation={8}
                    >
                      <Grid container spacing={1} sx={{ marginBottom: 4 }}>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <Typography
                            variant="h3"
                            color="secondary"
                            fontWeight={700}
                          >
                            Basic Info
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>
                      <Grid container spacing={1} sx={{ marginBottom: 0 }}>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <FormControl>
                            <Grid container spacing={3}>
                              <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  type="text"
                                  variant="filled"
                                  defaultValue={student.firstName || ""}
                                  label="First Name"
                                  color="text"
                                  focused
                                />
                              </Grid>
                              <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  type="text"
                                  variant="filled"
                                  defaultValue={student.lastName || ""}
                                  label="Last Name"
                                  color="text"
                                  focused
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  type="email"
                                  variant="filled"
                                  defaultValue={student.email || ""}
                                  label="Email"
                                  color="text"
                                  focused
                                />
                              </Grid>
                              <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  type="password"
                                  variant="filled"
                                  defaultValue={student.password || ""}
                                  label="Password"
                                  color="text"
                                  focused
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  type="text"
                                  variant="filled"
                                  defaultValue={student.firstName || ""}
                                  label="About Me"
                                  color="text"
                                  focused
                                />
                              </Grid>
                              <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  type="text"
                                  variant="filled"
                                  defaultValue={student.firstName || ""}
                                  label="LinkedIn"
                                  color="text"
                                  focused
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={3} md={3} lg={3}></Grid>
                              <Grid item xs={6} md={6} lg={6}>
                                <Button
                                  size="large"
                                  sx={{ backgroundColor: "#EBD99F" }}
                                >
                                  Submit
                                </Button>
                              </Grid>
                              <Grid item xs={3} md={3} lg={3}></Grid>
                            </Grid>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default EditProfile;
