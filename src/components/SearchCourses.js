import { Component } from "react";
import Copyright from "./Copyright";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
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
import { mainListItems, secondaryListItems } from "./listItems";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Carousel from "react-material-ui-carousel";

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
  MenuItem,
  InputLabel,
  FormControl,
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

class SearchCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},

      courses: [],
      coursesSuggested: [],
      reviews: [],
      currentCourse: null,
      currentIndex: -1,
      searchDepartment: "",
      text: "",
      sort: "",
      level: ""
    };

    this.toLandingpage = this.toLandingpage.bind(this);
    this.toCoursepage = this.toCoursepage.bind(this);
    this.toCalendar = this.toCalendar.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.toPlanofstudy = this.toPlanofstudy.bind(this);
    this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
    this.searchDepartment = this.searchDepartment.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.getSuggestedSemester = this.getSuggestedSemester.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
  }

  onChangeSearchDepartment(e) {
    const searchDepartment = e.target.value;
    this.setState({
      searchDepartment: searchDepartment,
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

  //Navagation links
  toLandingpage(id) {
    this.props.history.push(`/students/landingpage/${id}`);
  }
  toCoursepage(id, courseID) {
    this.props.history.push(`/course/${id}/${courseID}`);
  }
  toProfile(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }
  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toCalendar(id) {
    this.props.history.push(`/students/calendar/${id}`);
  }

  handleInput(event) {
    const value = event.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
  }
  handleChangeLevel(e) {
    this.setState({ level: e.target.value });
  }


  addCourse(id, currentCourse) {
    StudentService.addToBacklog(id, currentCourse);
  }

  getSuggestedSemester(id, sort, level) {
    console.log(id + " " + sort + " " + level);
    StudentService.getSuggestedSemester(id, sort, level).then((res) => {
      this.setState({ coursesSuggested: res.data });
    });
  }

  handleInput(event) {
    const value = event.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  render() {
    const {
      student,
      searchDepartment,
      courses,
      coursesSuggested,
      currentCourse,
      currentIndex,
      id,
      text,
      sort,
      level
    } = this.state;
    const notifications = this.state.student.notifications;

    
    console.log(coursesSuggested);
    return (
      <div>
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
                  <Button
                    sx={{
                      backgroundColor: "#ffffff",
                      fontWeight: 700,
                      mr: 1,
                      ml: 1,
                    }}
                    onClick={() => this.toPlanofstudy(id)}
                  >
                    Plan of Study
                  </Button>
                  <Button onClick={() => { this.toCalendar(this.state.student.email); }}
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

                <Button
                  color="inherit"
                  onClick={() => {
                    this.toProfile(this.state.student.email);
                  }}
                >
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

              <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                {/* Top Wide Container and Paper */}
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                  <Grid item xs={12} md={10} lg={10}>
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
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <Typography
                            variant="h3"
                            color="secondary"
                            fontWeight={700}
                          >
                            Search Courses
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>

                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <TextField
                            variant="filled"
                            fullWidth
                            label="Department"
                            value={searchDepartment}
                            onChange={this.onChangeSearchDepartment}
                          >
                          </TextField>
                          <Button
                            sx={{ margin: 2 }}
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={this.searchDepartment}
                          >
                            Search
                          </Button>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>

                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={3} md={3} lg={3}></Grid>
                        <Grid item xs={8} md={8} lg={8} sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}>
                          <List sx={{
                            p: 2,
                            overflow: "auto",
                            maxHeight: 300,
                          }}>
                            {courses &&
                              courses.map((course) => (
                                <ListItem>
                                  <CourseCard courseId={course.courseID} rating={course.averageRating} title={course.courseTitle} id={student.email} course={course}/>
                                </ListItem>
                              ))
                            }
                          </List>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                </Grid>

                {/* Middle Wide Container and Paper */}
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                  <Grid item xs={12} md={10} lg={10}>
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
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <Typography
                            variant="h3"
                            color="secondary"
                            fontWeight={700}
                          >
                            Suggested Courses
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>

                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={3} md={3} lg={3}></Grid>
                        <Grid item xs={3} md={3} lg={3}>
                          <FormControl fullWidth variant="filled">
                            <InputLabel id="sort-label">Sort By</InputLabel>
                            <Select
                              fullWidth
                              labelId="sort-label"
                              label="Sort By"
                              value={sort}
                              onChange={(e) =>
                                this.handleChangeSort(e)
                              }
                            >
                              <MenuItem value="">N/A</MenuItem>
                              <MenuItem value="avgGPA">Average GPA</MenuItem>
                              <MenuItem value="rating">Average Rating</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>
                          <FormControl fullWidth variant="filled">
                            <InputLabel>Course Level</InputLabel>
                            <Select fullWidth label="Course Level"
                              value={level}
                              onChange={(e) =>
                                this.handleChangeLevel(e)
                              }
                            >
                              <MenuItem value="-1">N/A</MenuItem>
                              <MenuItem value="1">100-199</MenuItem>
                              <MenuItem value="2">200-299</MenuItem>
                              <MenuItem value="3">300-399</MenuItem>
                              <MenuItem value="4">400-499</MenuItem>
                              <MenuItem value="5">500+</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}></Grid>
                      </Grid>

                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={5} md={5} lg={5}></Grid>
                        <Grid item xs={2} md={2} lg={2}>
                          <Button fullWidth variant="contained" color="secondary" type="button" onClick={() => this.getSuggestedSemester(id, sort, level)}>Search</Button>
                        </Grid>
                        <Grid item xs={5} md={5} lg={5}></Grid>
                      </Grid>

                      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={3} md={3} lg={3}></Grid>
                        <Grid item xs={8} md={8} lg={8} sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}>
                          <List sx={{
                            p: 2,
                            overflow: "auto",
                            maxHeight: 300,
                          }}>
                            {coursesSuggested &&
                              coursesSuggested.map((course) => (
                                <ListItem>
                                  <CourseCard courseId={course.courseID} rating={course.averageRating} title={course.courseTitle} id={student.email} course={course}/>
                                </ListItem>
                              ))
                            }
                          </List>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                      </Grid>


                    </Paper>
                  </Grid>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                </Grid>

                {/* Bottom Containers and Papers */}
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                  {/* Bottom Left Container and Paper */}
                  <Grid item xs={12} md={5} lg={5}>
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
                    ></Paper>
                  </Grid>

                  {/* Bottom Right Container and Paper */}
                  <Grid item xs={12} md={5} lg={5}>
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
                    ></Paper>
                  </Grid>
                  <Grid item xs={0} md={2} lg={3}></Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default SearchCourses;
