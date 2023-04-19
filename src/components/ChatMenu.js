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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
class ChatMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},

      courses: [],
      reviews: [],
      currentCourse: null,
      currentIndex: -1,
      searchDepartment: "",
      anchorElNav: null,
      anchorElUser: null,
    };

    this.drawerWidth = 240;
    this.pages = ["Find a Course", "Suggest a Semester", "Review a Course"];

    this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
    this.setActiveCourse = this.setActiveCourse.bind(this);
    this.searchDepartment = this.searchDepartment.bind(this);
    this.toLandingpage = this.toLandingpage.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
    StudentService.getSuggestedSemester(this.state.id).then((res) => {
      this.setState({ courses: res.data });
    });
  }

  toggleDrawer() {
    this.state.open = !this.state.open;
  }

  onChangeSearchDepartment(e) {
    const searchDepartment = e.target.value;

    this.setState({
      searchDepartment: searchDepartment,
    });
  }

  setActiveCourse(course, index) {
    this.setState({
      currentCourse: course,
      currentIndex: index,
    });
  }

  searchDepartment() {
    CourseService.getDepartment(this.state.searchDepartment)
      .then((response) => {
        this.setState({
          courses: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  toLandingpage(id) {
    this.props.history.push(`/students/landingpage/${id}`);
  }

  toCoursepage(idDept, idNum) {
    this.props.history.push(`/course/${idDept}/${idNum}/${this.state.id}`);
  }

  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toEditProfile(id) {
    this.props.history.push(`/students/editprofile/${id}`);
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

  render() {
    const courseList = this.state.courses.map((course) => {
      return (
        // <tr key={course.courseID}>
        //   <td style={{ whiteSpace: "nowrap" }}>{course.courseID}</td>

        //   <td>
        //     <ButtonGroup>
        //       <Button
        //         size="sm"
        //         color="danger"
        //         onClick={() => this.remove(course.courseID)}
        //       >
        //         Delete
        //       </Button>
        //     </ButtonGroup>
        //   </td>
        // </tr>

        <TableRow>
          <TableCell sx={{ color: "#EBD99F" }}>
            <b>{course.courseID}</b>
          </TableCell>
          <TableCell>{course.courseTitle}</TableCell>
          <TableCell sx={{ color: "#EBD99F" }}>
            <b>{course.creditHours}</b>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                this.toCoursepage(
                  course.courseIdDepartment,
                  course.courseIdNumber
                );
              }}
            >
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
                  this.toLandingpage(this.state.student.email);
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
                <Button
                  sx={{
                    backgroundColor: "#EBD99F",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                    borderRadius: 10,
                  }}
                >
                  Find a Course
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#EBD99F",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                    borderRadius: 10,
                  }}
                >
                  Suggest a Semester
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#EBD99F",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                    borderRadius: 10,
                  }}
                >
                  Plan of Study
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#EBD99F",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                    borderRadius: 10,
                  }}
                >
                  Transcript
                </Button>
              </ButtonGroup>

              <Button color="inherit">
                <Badge badgeContent={4} color="secondary">
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
                <Typography>123</Typography>
            </Container>
          </Box>
        </Box>
        <Copyright sx={{ margin: 5 }} />
      </ThemeProvider>
    );
  }
}

export default ChatMenu;
