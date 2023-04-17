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
import EditIcon from '@mui/icons-material/Edit';
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { mainListItems, secondaryListItems } from "./listItems";
import profilePic from "./profilepic.jpeg";

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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Form, Input } from "reactstrap";
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

      searchDepartment: "",
      degrees: [],
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
    this.requestConnection = this.requestConnection.bind(this);
    this.searchConnections = this.searchConnections.bind(this);
    this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
    this.getSuggestedConnections = this.getSuggestedConnections.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
      this.setState({ courses: res.data.backLog });
    });

    StudentService.getPlanofStudy(this.state.id).then((res) => {
      this.setState({degrees: res.data.degrees})
    })
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
    this.props.history.push(`/students/chat/${id}/${connectionID}`)
  }
  toSearchCourses(id){
    this.props.history.push(`/students/courses/${id}`);
  }
  toCalendar(id) {
    this.props.history.push(`/students/calendar/${id}`);
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

  remove(courseID) {
    let updatedStudents = [...this.state.courses].filter(
      (i) => i.courseID !== courseID
    );
    this.setState({ courses: updatedStudents });
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
    StudentService.getSearchConnections(this.state.id, this.state.searchDepartment).then((res) => {
      this.setState({searchedConnectionsList: res.data});
    })
  }

  getSuggestedConnections() {
    this.state.degrees?.forEach(mydegree => {
      console.log(mydegree);
      if (mydegree.degreeType == "MAJOR") {
        StudentService.getSearchConnections(this.state.id, mydegree.degreeTitle).then((res) => {
          this.setState({connectionsSuggested: res.data});
        });
      }
  });
  }

  onChangeSearchDepartment(e) {
    const searchDepartment = e.target.value;
    console.log(searchDepartment);
    this.setState({
        searchDepartment: searchDepartment
    });
  }


  //profile pic


  render() {
    //Objects
    const { student, courses, searchedConnectionsList, connectionsSuggested, searchDepartment, degrees} = this.state;
    const notifications = this.state.student.notifications;
    console.log(this.state.searchDepartment);
    console.log(this.state.connectionsSuggested);

    //Course backlog
    const courseList = courses.map((course) => {
      return (
        <TableRow>
          <TableCell sx={{ color: "#EBD99F" }}>
            <b>{course.courseID}</b>
          </TableCell>
          <TableCell>{course.courseTitle}</TableCell>
          <TableCell sx={{ color: "#EBD99F" }}>
            <b>{course.creditHours}</b>
          </TableCell>
          <TableCell>
            <Button onClick={() => {this.toCoursepage(course.courseIdDepartment, course.courseIdNumber, student.email, course.courseID)}}>
              View
            </Button>
          </TableCell>
          <TableCell>
            <IconButton onClick={() => this.remove(course.courseID)}>
              <DeleteIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

    //Active Connections List
    const connectionList = student.connectionsIds?.map((connection) => {
      return (
        <TableRow>
          <TableCell>
            <IconButton>
              <AccountCircleIcon
                sx={{ color: "#ffffff" }}
                fontSize="small"
              />
            </IconButton>
          </TableCell>
          <TableCell>{connection}</TableCell>
          <TableCell>
            <IconButton type="submit" onClick={() => this.toChat(student.email, connection)}>
              <ChatIcon
                fontSize="small"
                sx={{ color: "#EBD99F" }}
              />
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
              <Form onSubmit={() => this.handleRequest(student.email, request, "accept")}>
                <Button sx={{
                            backgroundColor: "#ffffff",
                            fontWeight: 700,
                            mr: 0,
                            ml: 1,
                        }} 
                        size="small" type="submit" >Accept</Button>
              </Form>
          </TableCell>
          <TableCell>
              <Form onSubmit={() => this.handleRequest(student.email, request, "")}>
                  <Button sx={{
                            backgroundColor: "#ffffff",
                            fontWeight: 700,
                            mr: 1,
                            ml: 0,
                        }} 
                        size="small" type="submit" >Decline</Button>
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
              <AccountCircleIcon
                sx={{ color: "#ffffff" }}
                fontSize="small"
              />
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
          <AppBar>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <Button
                onClick={() => {
                  this.toLandingpage(student.email);
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  noWrap
                  color="secondary"
                  sx={{ flexGrow: 1 }}
                  fontWeight={800}
                >
                  BOILERADVSR
                </Typography>
              </Button>
              <ButtonGroup
                disableElevation="true"
                variant="contained"
                color="secondary"
                sx={{ marginRight: 50, p: 4 }}
              >
                <Button onClick={() => {this.toSearchCourses(this.state.student.email);}}
                  sx={{
                    backgroundColor: "#ffffff",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                  }}
                >
                  Find a Course
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#ffffff",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                  }}
                >
                  Suggest a Semester
                </Button>
                <Button onClick={() => {this.toPlanofstudy(this.state.student.email);}}
                  sx={{
                    backgroundColor: "#ffffff",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                  }}
                >
                  Plan of Study
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#ffffff",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                  }}
                >
                  Transcript
                </Button>
                <Button onClick={() => {this.toCalendar(this.state.student.email);}}
                  sx={{
                    backgroundColor: "#ffffff",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                  }}
                >
                  Calendar
                </Button>
              </ButtonGroup>

              <Button color="inherit">
                <Badge badgeContent={notifications && notifications.length} color="secondary">
                  <Avatar
                    variant="circle"
                    src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                    alt="profilepic"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: 40,
                      width: 40,
                    }}
                  />
                </Badge>
              </Button>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
               {/* Chart */}
 
                <Grid item xs={2} md={2} lg={2}></Grid>
                <Grid item xs={8} md={8} lg={8}>
                  <Container></Container>
                </Grid>
                <Grid item xs={2} md={2} lg={2}></Grid>

                <Grid item xs={12} md={7} lg={8}>
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
                      bowShadow: 3,
                    }}
                  >
                    <Stack
                      sc={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginBottom: 2,
                        }}
                        variant="h3"
                        fontWeight={700}
                        color="secondary"
                      >
                        {this.state.student.firstName}{" "}
                        {this.state.student.lastName}
                      </Typography>

                      <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                        <Grid item xs={4} md={4} lg={4}></Grid>
                        <Grid
                          item
                          xs={4}
                          md={4}
                          lg={4}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                            alt="profilepic"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              verticalAlign: "middle",
                              height: 150,
                              width: 150,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}></Grid>
                      </Grid>

                      <Container
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginBottom: 1,
                          width: 20,
                        }}
                      >
                        <Stack>
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
                            >
                              {this.state.student.email}
                            </Button>
                          </Tooltip>
                          <Tooltip title="View LinkedInProfile">
                            <Button
                              startIcon={
                                <LinkedInIcon sx={{ color: "#EBD99F" }} />
                              }
                              sx={{ color: "#ffffff" }}
                              onClick={() => {
                                window.location = linkedInUrl;
                              }}
                            >
                              {linkedInUsername}
                            </Button>
                          </Tooltip>
                        </Stack>
                      </Container>

                      <Typography variant="h7" color="secondary" fontWeight={700} sx={{marginTop: 3}}>Account Actions</Typography>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginBottom: 1,
                        }}
                      >
                        <Button onClick={() => {this.toEditProfile(this.state.student.email);}}
                          size="small"
                          color="secondary"
                          variant="contained"
                          sx={{ backgroundColor: '#ffffff', width: 100, margin: 1, padding: 1 }}
                          startIcon={
                            <EditIcon sx={{ color: "#EBD99F" }} />
                          }
                        >
                          Edit
                        </Button>
                        <Button onClick={() => {this.delete(this.state.student.email);}}
                          size="small"
                          color="secondary"
                          variant="contained"
                          sx={{ backgroundColor: '#ffffff', width: 100, margin: 1, padding: 1 }}
                          startIcon={
                            <DeleteIcon sx={{ color: "#EBD99F" }} />
                          }
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Stack>
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={4}
                  sx={{ verticalAlign: "middle" }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} color="secondary">
                      Classmates
                    </Typography>
                    <Table size="medium">
                      <TableHead></TableHead>
                      <TableBody>
                        {connectionList}
                      </TableBody>
                    </Table>
                    <Typography paddingTop={3} variant="h5" fontWeight={700} color="secondary">
                      Incomming Connection Requests
                    </Typography>
                    <Table size="medium">
                      <TableBody>
                        {this.state.student.connectionRequests && requestList}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
                <br></br>
                    <Card alignItems="center" justifyContent="center" sx={{padding: 5}}>
                        <br></br>
                        <Typography variant="h5">Suggested Friends List</Typography>
                        <Button onClick={this.getSuggestedConnections}>Generate Suggested Connections List</Button>
                        <ul className="list-group">
                            {connectionsSuggested &&
                                connectionsSuggested.map((connection, index) => (
                                    <li
                                        className={
                                            "list-group-item "
                                        }
                                        onClick={() => {this.requestConnection(student.email, connection)}}
                                        key={index}
                                    >
                                       <Typography color="secondary"> {connection} </Typography>
                                    </li>
                                ))}
                        </ul>
                <br></br>
                <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Search by department"
                    value={searchDepartment}
                    onChange={this.onChangeSearchDepartment}
                />
                <div className="input-group-append">
                    <Button sx={{margin: 2}} type="button" variant="contained" onClick={this.searchConnections}>
                        Search
                    </Button>          
                </div>
                <br></br>
                <div className="col-md-8">
                    <Typography color="secondary" varient="h3">Searched Friends List</Typography>
                    <ul className="list-group">
                        {searchedConnectionsList &&
                            searchedConnectionsList.map((connection, index) => (
                                <li
                                    className={
                                        "list-group-item "
                                    }
                                    onClick={() => {this.requestConnection(student.email, connection)}}
                                    key={index}
                                >
                                    <Typography color="primary"> {connection} </Typography>
                                </li>
                            ))}
                    </ul>
                </div>
                </Card>
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={4}
                  sx={{ verticalAlign: "middle" }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} color="secondary">
                      Notifications
                    </Typography>

                    <Table size="small">
                      <TableHead></TableHead>
                      <TableBody>
                        {notificationsList}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                    }}
                  >
                    <Typography variant="h3" fontWeight={700} color="secondary">
                      Course Backlog
                    </Typography>
                    <Table>
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
