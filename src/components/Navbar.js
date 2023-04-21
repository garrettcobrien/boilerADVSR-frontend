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
import Menu from "@mui/material/Menu";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Form, Input } from "reactstrap";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
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
    this.toCoursepage = this.toCoursepage.bind(this);
    this.toCalendar = this.toCalendar.bind(this);
    this.requestConnection = this.requestConnection.bind(this);
    this.searchConnections = this.searchConnections.bind(this);
    this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
    this.getSuggestedConnections = this.getSuggestedConnections.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.toProfile = this.toProfile.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
      this.setState({ courses: res.data.backLog });
    });

    StudentService.getPlanofStudy(this.state.id).then((res) => {
      this.setState({ degrees: res.data.degrees });
    });
  }

  //Navigation functions
  toProfile(id) {
    console.log(id);
    this.props.history.push(`/students/dashboard/${id}`);
  }
  toLandingpage(id) {
    this.props.history.push(`/students/landingpage/${id}`);
  }
  toCoursepage(idDept, idNum, id, courseID) {
    this.props.history.push(`/course/${id}/${courseID}`);
  }
  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toChat(id, connectionID) {
    this.props.history.push(`/students/chat/${id}/${connectionID}`);
  }
  toSearchCourses(id) {
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
    StudentService.getSearchConnections(
      this.state.id,
      this.state.searchDepartment
    ).then((res) => {
      this.setState({ searchedConnectionsList: res.data });
    });
  }

  getSuggestedConnections() {
    this.state.degrees?.forEach((mydegree) => {
      console.log(mydegree);
      if (mydegree.degreeType == "MAJOR") {
        StudentService.getSearchConnections(
          this.state.id,
          mydegree.degreeTitle
        ).then((res) => {
          this.setState({ connectionsSuggested: res.data });
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

  render() {
    return (
      <AppBar sx={{ padding: 2 }}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Grid container spacing={3}>
            {/* Left Third */}
            <Grid
              item
              xs={5}
              md={5}
              lg={5}
              sx={{
                paddingTop: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <ButtonGroup>
                <Button
                  component={RouterLink}
                  to={`/students/courses/${this.props.id}`}
                  size="small"
                  color="secondary"
                  variant="contained"
                  sx={{
                    backgroundColor: "#2c2c2c",
                    color: "#EBD99F",
                    width: "auto",
                    margin: 1,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Find a Course
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  component={RouterLink}
                  to={`/students/suggest/${this.props.id}`}
                  sx={{
                    backgroundColor: "#2c2c2c",
                    color: "#EBD99F",
                    width: "auto",
                    margin: 1,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Suggest Semester
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  component={RouterLink}
                  to={`/students/planofstudy/${this.props.id}`}
                  sx={{
                    backgroundColor: "#2c2c2c",
                    color: "#EBD99F",
                    width: "auto",
                    margin: 1,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Plan of Study
                </Button>
              </ButtonGroup>
            </Grid>

            {/* Middle Third */}
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
              <Button
                component={RouterLink}
                to={`/students/landingpage/${this.props.id}`}
              >
                <img
                  src="https://i.ibb.co/sJ4dbbn/advsr-text-logo.png"
                  width={170}
                  height={29}
                ></img>
              </Button>
            </Grid>

            <Grid item xs={2} md={2} lg={2}></Grid>

            {/* Right Third */}
            <Grid
              item
              xs={3}
              md={3}
              lg={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={3}
                  md={3}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                ></Grid>
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
                  <NotificationsIcon sx={{ color: "#EBD99F" }} />
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
                  <ChatIcon sx={{ color: "#EBD99F" }} />
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
                  <IconButton component={RouterLink} to={`/students/calendar/${this.props.id}`}>
                    <CalendarMonthIcon sx={{ color: "#EBD99F" }} />
                  </IconButton>
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
                  <Button
                    component={RouterLink}
                    to={`/students/dashboard/${this.state.id}`}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <Avatar
                        variant="circle"
                        src={this.state.student.profilePicture}
                        alt="profilepic"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          height: 40,
                          width: 40,
                          marginLeft: 3,
                        }}
                      />
                    </Badge>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
