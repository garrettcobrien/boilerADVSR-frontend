import { Component } from "react";
import Copyright from "./Copyright";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeleteIcon from "@mui/icons-material/Delete";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Navbar from "./Navbar";

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
  CardMedia,
  Avatar,
  Link,
  TextField,
  MenuItem,
  TableContainer,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Form, Input } from "reactstrap";
import { Logout } from "@mui/icons-material";
import ChatService from "../services/ChatService";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},

      courses: [],
      reviews: [],
      connectionsSuggested: [],
      searchedConnectionsList: [],
      connectionPfps: [""],

      searchDepartment: "",
      suggested: "suggested",
      degrees: [],
      hasBeenClicked: "visible",
      hasBeenClickedD: "hidden",
      anchorElNav: null,
      anchorElUser: null,
    };

    this.drawerWidth = 240;
    this.pages = ["Find a Course", "Suggest a Semester", "Review a Course"];

    this.toLandingpage = this.toLandingpage.bind(this);
    this.toChat = this.toChat.bind(this);
    this.toSearchCourses = this.toSearchCourses.bind(this);
    this.toPlanofstudy = this.toPlanofstudy.bind(this);
    this.toEditProfile = this.toEditProfile.bind(this);
    this.toCoursepage = this.toCoursepage.bind(this);
    this.toCalendar = this.toCalendar.bind(this);
    this.logout = this.logout.bind(this);
    this.requestConnection = this.requestConnection.bind(this);
    this.searchConnections = this.searchConnections.bind(this);
    this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
    this.getSuggestedConnections = this.getSuggestedConnections.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.remove = this.remove.bind(this);
  }


  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
      this.setState({ courses: res.data.backLog });
    });

    StudentService.getPlanofStudy(this.state.id).then((res) => {
      this.setState({ degrees: res.data.degrees });
    });
    this.setState({hasBeenClicked: "visible"});    
    //this.forceUpdate();
  }

  //Navigation functions
  toLandingpage(id) {
    this.props.history.push(`/students/landingpage/${id}`);
  }
  toCoursepage(idDept, idNum, id, courseID) {
    this.props.history.push(`/course/${id}/${courseID}`);
  }
  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toEditProfile(id) {
    this.props.history.push(`/students/editprofile/${id}`);
  }
  toChat(id, connectionID) {
    ChatService.removeNotif(this.state.id, this.state.connectionID);
    this.props.history.push(`/students/chat/${id}/${connectionID}`);
  }
  toSearchCourses(id) {
    this.props.history.push(`/students/courses/${id}`);
  }
  toCalendar(id) {
    this.props.history.push(`/students/calendar/${id}`);
  }
  logout() {
    this.props.history.push(`/`);
  }
  //end nav functions

  toggleDrawer() {
    this.state.open = !this.state.open;
  }
  setAnchorElNav(target) {
    this.setState({
      anchorElNav: target,
    });
  }

  setAnchorElUser(target) {
    this.setState({
      anchorElUser: target,
    });
  }

  handleOpenNavMenu(event) {
    this.setAnchorElNav(event.currentTarget);
  }

  handleOpenUserMen(event) {
    this.setAnchorElUser(event.currentTarget);
  }

  handleCloseNavMenu() {
    this.setAnchorElNav(null);
  }

  handleCloseUserMenu() {
    this.setAnchorElUser(null);
  }

  delete(id) {
    StudentService.deleteStudent(id);
    this.props.history.push("/");
  }

  remove(id, courseID) {
    StudentService.removeBacklog(id, courseID);
    StudentService.getStudentById(id).then((res) => {
      this.setState({courses: res.data.backLog});
    })
    //this.forceUpdate();
  }

  handleRequest(id, connectionID, status) {
    StudentService.handleRequest(id, connectionID, status);
    //this.props.history.push(`/students/landingpage/${id}`);
    //this.forceUpdate();
  }

  requestConnection(id, connectionID) {
    console.log("requested connection");
    StudentService.requestConnection(id, connectionID);
  }

  searchConnections() {
    console.log("search toggled");
    StudentService.getSearchConnections(
      this.state.id,
      this.state.searchDepartment
    ).then((res) => {
      this.setState({ searchedConnectionsList: res.data });
      console.log("Searched connections " + this.state.connectionsSuggested);
    });
  }

  getSuggestedConnections() {
    this.setState({hasBeenClicked: "hidden"});
    this.state.degrees?.forEach((mydegree) => {
      console.log(mydegree);
      if (mydegree.degreeType == "MAJOR") {
        StudentService.getSearchConnections(
          this.state.id,
          mydegree.degreeTitle
        ).then((res) => {
          this.setState({ connectionsSuggested: res.data });
          console.log(
            "Suggested connections " + this.state.connectionsSuggested
          );
        });
      }
    });
  }

  onChangeSearchDepartment(e) {
    const searchDepartment = e.target.value;
    console.log(searchDepartment);
    this.setState({
      searchDepartment: searchDepartment,
    });
  }

  //profile pic

  render() {
    //Objects
    const {
      student,
      courses,
      searchedConnectionsList,
      connectionsSuggested,
      searchDepartment,
      degrees,
      connectionPfps,
      hasBeenClicked

    } = this.state;
    const notifications = this.state.student.notifications;
    console.log(this.state.searchDepartment);
    console.log(this.state.connectionsSuggested);
    
    // Attempt at profile picture
    // let list = [];
    // if (student && student.connectionsIds && connectionPfps.length > student.connectionsIds) {
    //   this.state.student.connectionsIds?.forEach(connection => {
    //     StudentService.getProfilePic(connection).then((res) => {
    //               connectionPfps.push(res.data);
    //     })
    //   });
    // }
    

    //Course backlog
    const courseList = courses?.map((course) => {
      return (
        <TableRow>
          <TableCell sx={{ color: "#EBD99F" }}>
            <b>{course.courseID || ""}</b>
          </TableCell>
          <TableCell>{course.courseTitle}</TableCell>
          <TableCell sx={{ color: "#EBD99F" }}>
            <b>{course.creditHours || ""}</b>
          </TableCell>
          <TableCell>
            <Button
              type="submit"
              sx={{ backgroundColor: "#EBD99F" }}
              onClick={() => {
                this.toCoursepage(
                  course.courseIdDepartment,
                  course.courseIdNumber,
                  student.email,
                  course.courseID
                );
              }}
            >
              View
            </Button>
          </TableCell>
          <TableCell>
            <IconButton
              type="submit"
              onClick={() =>
                this.remove(this.state.student.email, course.courseID)
              }
            >
              <DeleteIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

    //Active Connections List
    const connectionList = student.connectionsIds?.map((connection, index) => {
      return (
        <TableRow>
          <TableCell>
            <Avatar src={connectionPfps.at(index)} />
          </TableCell>
          <TableCell>{connection}</TableCell>
          <TableCell>
            <IconButton
              type="submit"
              onClick={() => this.toChat(student.email, connection)}
            >
              <ChatIcon fontSize="small" sx={{ color: "#EBD99F" }} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

    //Connections waiting to be handled
    const requestList = student.connectionRequests?.map((request) => {
      return (
        <TableRow>
          <TableCell>{request}</TableCell>
          <TableCell>
            <Form
              onSubmit={() =>
                this.handleRequest(student.email, request, "accept")
              }
            >
              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  fontWeight: 700,
                  mr: 0,
                  ml: 0,
                }}
                size="small"
                type="submit"
              >
                Accept
              </Button>
            </Form>
          </TableCell>
          <TableCell>
            <Form
              onSubmit={() => this.handleRequest(student.email, request, "")}
            >
              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  fontWeight: 700,
                  mr: 0,
                  ml: 0,
                }}
                size="small"
                type="submit"
              >
                Decline
              </Button>
            </Form>
          </TableCell>
        </TableRow>
      );
    });

    //Notfications List
    const notificationsList = student.notifications?.map((notif) => {
      return (
        <TableRow>
          <TableCell>
            <IconButton>
              <AccountCircleIcon sx={{ color: "#ffffff" }} fontSize="small" />
            </IconButton>
          </TableCell>
          <TableCell>{notif}</TableCell>
        </TableRow>
      );
    });

    const linkedInUrl = "" + this.state.student.linkedIn;
    const linkedInUsername = linkedInUrl.substring(28, linkedInUrl.length - 1);
    var emailLink = "mailto:" + this.state.student.email;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Navbar id={this.state.id} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Container sx={{ marginTop: 0, marginBottom: 0 }}>
              <Grid
                container
                spacing={3}
                sx={{ marginBottom: 0, marginTop: 4, height: "auto" }}
              >
                {/* Title Card */}
                <Grid
                  item
                  xs={6}
                  md={6}
                  lg={6}
                  sx={{
                    marginTop: 4,
                    paddingTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle",
                    height: "auto",
                  }}
                >
                  <Paper
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "80%",
                      width: "100%",
                    }}
                  >
                    <Grid
                      container
                      spacing={0}
                      sx={{
                        p: 1,
                        marginTop: 4,
                        marginBottom: 6,
                        marginLeft: 0,
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        md={6}
                        lg={6}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginBottom: 2,
                        }}
                      >
                        <Avatar
                          src={this.state.student.profilePicture}
                          alt="profilepic"
                          sx={{height: 215, width: 215}}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={6}
                        md={6}
                        lg={6}
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                          textAlign: "left",
                          verticalAlign: "middle",
                          marginLeft: 0,
                        }}
                      >
                        <Stack>
                          <Typography
                            variant="h3"
                            fontWeight={700}
                            color="secondary"
                          >
                            {this.state.student.firstName}{" "}
                            {this.state.student.lastName}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={400}
                            color="text"
                          >
                            {this.state.student.email}
                          </Typography>
                          <Grid container>
                            <Grid
                              item
                              xs={2}
                              md={2}
                              lg={2}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <Tooltip title="Copy Email">
                                <Button
                                  startIcon={
                                    <EmailIcon sx={{ color: "#EBD99F" }} />
                                  }
                                  sx={{ color: "#ffffff" }}
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      this.state.student.email
                                    );
                                  }}
                                  size="large"
                                ></Button>
                              </Tooltip>
                            </Grid>

                            <Grid
                              item
                              xs={2}
                              md={2}
                              lg={2}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <Tooltip title="View LinkedInProfile">
                                <Button
                                  startIcon={
                                    <LinkedInIcon sx={{ color: "#EBD99F" }} />
                                  }
                                  sx={{ color: "#ffffff" }}
                                  onClick={() => {
                                    window.location = linkedInUrl;
                                  }}
                                  size="large"
                                ></Button>
                              </Tooltip>
                            </Grid>
                          </Grid>

                          <Typography
                            sx={{ marginBottom: 1, marginTop: 0 }}
                            fontWeight={600}
                            fontSize={20}
                            color="secondary"
                          >
                            Account Actions
                          </Typography>

                          <Button
                            onClick={() => {
                              this.toEditProfile(this.state.student.email);
                            }}
                            size="small"
                            color="secondary"
                            variant="contained"
                            sx={{
                              backgroundColor: "#ffffff",
                              padding: 1,
                              width: "50%",
                              marginTop: 1,
                            }}
                            startIcon={<EditIcon sx={{ color: "#EBD99F" }} />}
                          >
                            Edit
                          </Button>

                          <Button
                            onClick={() => {
                              this.delete(this.state.student.email);
                            }}
                            size="small"
                            color="secondary"
                            variant="contained"
                            sx={{
                              backgroundColor: "#ffffff",
                              padding: 1,
                              width: "50%",
                              marginTop: 1,
                            }}
                            startIcon={<DeleteIcon sx={{ color: "#EBD99F" }} />}
                          >
                            Delete
                          </Button>

                          <Button
                            onClick={() => this.logout()}
                            size="small"
                            color="secondary"
                            variant="contained"
                            sx={{
                              backgroundColor: "#ffffff",
                              padding: 1,
                              width: "50%",
                              marginTop: 1,
                            }}
                            startIcon={<Logout sx={{ color: "#EBD99F" }} />}
                          >
                            Log Out
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Course Backlog */}
                <Grid
                  item
                  xs={6}
                  md={6}
                  lg={6}
                  sx={{
                    marginTop: 4,
                    paddingTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle",
                    height: "auto",
                  }}
                  height={"auto"}
                >
                  <Paper
                    sx={{
                      paddingTop: 4,
                      paddingBottom: 4,
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "auto",
                    }}
                    height={"auto"}
                  >
                    <Container>
                      <Grid
                        container
                        spacing={0}
                        padding={0}
                        sx={{ height: "auto" }}
                      >
                        <Grid
                          item
                          xs={12}
                          md={12}
                          lg={12}
                          sx={{
                            justifyContent: "center",
                            textAlign: "center",
                            height: "auto",
                            paddingTop: 0,
                            paddingLeft: 0,
                            marginLeft: 0,
                          }}
                          paddingLeft={0}
                          paddingTop={0}
                        >
                          <Typography
                            variant="h3"
                            fontWeight={700}
                            color="secondary"
                          >
                            Course Backlog
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          lg={12}
                          sx={{
                            justifyContent: "center",
                            textAlign: "center",
                            height: "auto",
                          }}
                        >
                          <TableContainer
                            sx={{
                              width: "auto",
                              maxHeight: 400,
                              marginTop: 2,
                            }}
                          >
                            <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <b>Course</b>
                                  </TableCell>
                                  <TableCell>
                                    <b>Title</b>
                                  </TableCell>
                                  <TableCell>
                                    <b>Credits</b>
                                  </TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>{courseList}</TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </Container>
                  </Paper>
                </Grid>

                {/* Notifcations */}
                <Grid
                  item
                  xs={4}
                  md={4}
                  lg={4}
                  sx={{
                    marginTop: 0,
                    paddingTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Paper
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      marginBottom: 3,
                      marginTop: 2,
                      height: 280,
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="secondary"
                      >
                        Notifications
                      </Typography>
                      <TableContainer sx={{maxHeight: 400}}>
                      <Table sx={{ width: 300 }}>
                        <TableHead></TableHead>
                        <TableBody>{notificationsList}</TableBody>
                      </Table>
                      </TableContainer>
                    </Stack>
                  </Paper>
                </Grid>

                {/* Classmates */}
                <Grid
                  item
                  xs={4}
                  md={4}
                  lg={4}
                  sx={{
                    paddingTop: 1,
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Paper
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      marginBottom: 3,
                      marginTop: 2,
                      height: 280,
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="secondary"
                      >
                        Classmates
                      </Typography>
                      <TableContainer sx={{maxHeight: 400}}>
                      <Table sx={{ width: 300 }}>
                        <TableHead></TableHead>
                        <TableBody>{connectionList}</TableBody>
                      </Table>
                      </TableContainer>
                    </Stack>
                  </Paper>
                </Grid>

                {/* Requests */}
                <Grid
                  item
                  xs={4}
                  md={4}
                  lg={4}
                  sx={{
                    paddingTop: 1,
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Paper
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      marginBottom: 3,
                      marginTop: 2,
                      height: 280,
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="secondary"
                      >
                        Requests
                      </Typography>
                      <TableContainer sx={{ maxHeight: 400}}>
                      <Table>
                        <TableHead></TableHead>
                        <TableBody>{requestList}</TableBody>
                      </Table>
                      </TableContainer>
                    </Stack>
                  </Paper>
                </Grid>

                {/* Suggested */}
                <Grid
                  item
                  xs={6}
                  md={6}
                  lg={6}
                  sx={{
                    paddingTop: 1,
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Paper
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      marginBottom: 3,
                      height: "100%",
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Stack sx={{ justifyContent: "center" }}>
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="secondary"
                      >
                        Suggested Classmates
                      </Typography>
                      <Button color="secondary" variant="contained" size="small" 
                      sx={{
                    backgroundColor: "#2c2c2c",
                    color: "#EBD99F",
                    width: "auto",
                    margin: 1,
                    fontSize: 15,
                    fontWeight: 600,
                    visibility: hasBeenClicked,
                    display: hasBeenClicked==="hidden" ? "none" : "show"
                  }} 
                  
                  type="button" onClick={() => this.getSuggestedConnections()}>
                      View
                    </Button>
                    <TableContainer sx={{maxHeight: 400}}>
                      <Table sx={{ width: 450 }}>
                        <TableHead></TableHead>
                        <TableBody>
                          {connectionsSuggested &&
                            connectionsSuggested.map((connection, index) => (
                              <TableRow>
                                <TableCell>
                                  <Avatar />
                                </TableCell>
                                <TableCell>
                                  
                                    <Typography color="secondary">
                                      {" "}
                                      {connection}{" "}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => this.requestConnection(
                                      this.state.id,
                                      connection
                                    )}
                                    color="secondary"
                                  >
                                    Add
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      </TableContainer>
                    </Stack>
                  </Paper>
                </Grid>

                {/* By department */}
                <Grid
                  item
                  xs={6}
                  md={6}
                  lg={6}
                  sx={{
                    paddingTop: 1,
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Paper
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      marginBottom: 3,
                      marginTop: 0,
                      minHeight: 280,
                      height: "auto",
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Grid container spacing={0} sx={{ p: 1 }}>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                          marginBottom: 2,
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontWeight={700}
                          color="secondary"
                        >
                          Find Classmates
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                          marginBottom: 2,
                        }}
                      >
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder="Department Name"
                          value={searchDepartment}
                          onChange={this.onChangeSearchDepartment}
                          sx={{ marginTop: 0 }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                          marginBottom: 2,
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "#ffffff",
                            width: 300,
                            margin: 1,
                            padding: 1,
                          }}
                          color="secondary"
                          type="button"
                          variant="contained"
                          onClick={() => this.searchConnections()}
                          startIcon={<EditIcon sx={{ color: "#EBD99F" }} />}
                        >
                          Search
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                          marginBottom: 2,
                        }}
                      >
                        <Typography
                          variant="h7"
                          color="secondary"
                          fontWeight={700}
                          sx={{ marginTop: 0 }}
                        >
                          Results
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                        }}
                      >
                        <TableContainer sx={{maxHeight: 400}}>
                        <Table>
                          <TableBody>
                            {searchedConnectionsList &&
                              searchedConnectionsList.map(
                                (connection, index) => (
                                  <TableRow>
                                    <TableCell>
                                      <Avatar />
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        onClick={() => {
                                          this.requestConnection(
                                            student.email,
                                            connection
                                          );
                                        }}
                                      >
                                        <Typography color="secondary">
                                          {" "}
                                          {connection}{" "}
                                        </Typography>
                                      </Button>
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        onClick={() => this.requestConnection(
                                          this.state.id,
                                          connection
                                        )}
                                        color="secondary"
                                      >
                                        Add
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                          </TableBody>
                        </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Copyright sx={{ margin: 5 }} />
      </ThemeProvider>
    );
  }
}

export default Dashboard;
