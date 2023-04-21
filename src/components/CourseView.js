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
  TextField
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

class CourseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: this.props.match.params.courseID,
      id: this.props.match.params.id,
      student: {},
      course: {},
      textReview: "",
      textQuestion: "",
      textResponse: "",
      textResponseFinal: "",
      rating: "",
      chat: "",

      reviewNumber: 1,
    };

    this.drawerWidth = 240;
    this.pages = ["Find a Course", "Suggest a Semester", "Review a Course"];

    this.toLandingpage = this.toLandingpage.bind(this);
    this.toCalendar = this.toCalendar.bind(this);
    this.toDashboard = this.toDashboard.bind(this);
    this.toPlanofstudy = this.toPlanofstudy.bind(this);
    this.toSearchCourses = this.toSearchCourses.bind(this);
    this.addReview = this.addReview.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.courseRec = this.courseRec.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewText = this.handleReviewText.bind(this);
  }

  componentDidMount() {
    CourseService.getCourse(this.state.courseID).then((res) => {
      this.setState({ course: res.data });
      this.setState({})
    });
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
  }

  toggleDrawer() {
    this.state.open = !this.state.open;
  }

  //Navigation Links
  toDashboard(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }
  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toEditProfile(id) {
    this.props.history.push(`/students/editprofile/${id}`);
  }
  toLandingpage(id) {
    this.props.history.push(`/students/landingpage/${id}`);
  }
  toSearchCourses(id){
    this.props.history.push(`/students/courses/${id}`);
  }
  toCalendar(id) {
    this.props.history.push(`/students/calendar/${id}`);
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

  handleNextReview(current) {
    current++;
    this.setState({
      reviewNumber: current,
    });
  }

  handlePrevReview(current) {
    current--;
    this.setState({
      reviewNumber: current,
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

  addReview(courseID, id, text, rating) {
    CourseService.addReview(courseID, id, text, rating);
  }

  addQuestion(courseID, id, text, rating, desc) {
    CourseService.addQuestion(courseID, id, text, rating, desc);
  }

  handleInput(event) {
    const value = event.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  addCourse(id, currentCourse) {
    StudentService.addToBacklog(id, currentCourse);
  }

  courseRec(id, connectionID, courseID) {
    ChatService.getChat(id, connectionID).then((res) => {
      const chat = res.data;
      console.log("Course sent to " + connectionID + " chat id: " + chat.id);
      ChatService.sendCourse(id, courseID, chat.id);
    });
  }

  handleRatingChange(e) {
    this.setState({rating: e.target.value});
  }
  handleReviewText(e) {
    const textReview = e.target.value;
    this.setState({
      textReview: textReview,
    });
  }

  render() {
    const { course, textReview, textQuestion, textResponse, rating, chat } = this.state;
    const notifications = this.state.student.notifications;

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
                    backgroundColor: "#ffffff",
                    fontWeight: 700,
                    mr: 1,
                    ml: 1,
                  }}
                  onClick={() => {this.toSearchCourses(this.state.student.email);}}
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
                  onClick={() => this.toPlanofstudy(this.state.student.email)}
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
                  this.toDashboard(this.state.student.email);
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
                      {course.courseIdDepartment} {course.courseIdNumber}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                        marginBottom: 2,
                      }}
                      variant="h4"
                      fontWeight={600}
                      color="text"
                    >
                      {course.courseTitle}
                    </Typography>
                    <Grid container sx={{ marginBottom: 0 }} spacing={1}>
                      <Grid item xs={3} md={3} lg={3}></Grid>
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
                        <Typography fontSize={12}>Average Rating: {course.averageRating}</Typography>
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
                        <Typography fontSize={12}>Average GPA: {course.averageGPA}</Typography>
                      </Grid>

                      <Grid
                        item
                        xs={1}
                        md={1}
                        lg={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Typography fontSize={12}>Save</Typography>
                      </Grid>

                      <Grid
                        item
                        xs={1}
                        md={1}
                        lg={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Typography fontSize={12}>Share</Typography>
                      </Grid>

                      <Grid item xs={3} md={3} lg={3}></Grid>
                    </Grid>
                    <Grid container sx={{ marginBottom: 2 }} spacing={1}>
                      <Grid item xs={3} md={3} lg={3}></Grid>
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
                        <Rating
                          readOnly
                          value={course.averageRating || 0}
                          precision={0.25}
                          icon={<StarIcon/>}
                          emptyIcon={<StarBorderIcon  style={{color: '#EBD99F'}}/>}
                          size="small"
                          style={{color: '#EBD99F'}}
                        ></Rating>
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
                        <Tooltip title="3.2">
                        <Rating
                          readOnly
                          value={course.averageGPA || 0}
                          precision={0.1}
                          
                          icon={<CircleIcon/>}
                          emptyIcon={<CircleOutlinedIcon  style={{color: '#EBD99F'}} />}
                          size="small"
                          style={{color: '#EBD99F'}}
                        ></Rating>
                        </Tooltip>
                      </Grid>

                      <Grid
                        item
                        xs={1}
                        md={1}
                        lg={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Tooltip title="Add to Course Backlog">
                          <IconButton
                            variant="contained"
                            color="secondary"
                            size="small"
                          >
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>

                      <Grid
                        item
                        xs={1}
                        md={1}
                        lg={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Tooltip title="Share with Classmate">
                          <IconButton
                            variant="contained"
                            color="secondary"
                            size="small"
                          >
                            <SendIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>

                      <Grid item xs={3} md={3} lg={3}></Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={0} md={1} lg={1}></Grid>
              </Grid>

              <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                <Grid item xs={0} md={1} lg={1}></Grid>
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
                      variant="h4"
                      fontWeight={600}
                      color="secondary"
                      elevation={8}
                    >
                      Reviews
                    </Typography>

                    <Grid container sx={{ marginBottom: 2 }}>
                      <Grid item xs={0} md={0} lg={0}></Grid>

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
                        }}
                      >
                        <List
                          sx={{
                            p: 2,
                            overflow: "auto",
                            maxHeight: 450,
                          }}
                        >
                          {course.reviews &&
                            course.reviews.map((review) => (
                              <ListItem disablePadding>
                                <ReviewCard name={review.studentReviewer} rating={review.overallRating} text={review.reviewText} major={review.degrees} />
                              </ListItem>
                            ))
                          }
                        </List>
                      </Grid>
                      <Grid item xs={0} md={0} lg={0}></Grid>
                    </Grid>


                    <Grid container sx={{ marginBottom: 2, marginTop: 2 }}>
                      <Grid item xs={1} md={1} lg={1}></Grid>

                      <Grid
                        item
                        xs={10}
                        md={10}
                        lg={10}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Rating value={rating} onChange={(e) => this.handleRatingChange(e)} />
                      </Grid>
                      <Grid item xs={1} md={1} lg={1}></Grid>
                    </Grid>


                    <Grid container sx={{ marginBottom: 2, marginTop: 2 }}>
                      <Grid item xs={1} md={1} lg={1}></Grid>

                      <Grid
                        item
                        xs={10}
                        md={10}
                        lg={10}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <TextField fullWidth multiline maxRows={5} variant="filled" label="Your Review" 
                          value={textReview} onChange={(e) => this.handleReviewText(e)}
                        />
                      </Grid>
                      <Grid item xs={1} md={1} lg={1}></Grid>
                    </Grid>



                    <Grid container sx={{ marginBottom: 2, marginTop: 2 }}>
                      <Grid item xs={2} md={2} lg={2}></Grid>
                      <form onSubmit={() =>
                            this.addReview(course.courseID, this.state.student.email, textReview, rating)
                          }>
                      <Grid
                        item
                        xs={8}
                        md={8}
                        lg={8}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<QuestionAnswer />}
                          elevation={8}
                          type="submit"
                        >
                          Write a Review
                        </Button>
                      </Grid>
                      <Grid item xs={2} md={2} lg={2}></Grid>
                      </form>
                    </Grid>
                  </Paper>
                </Grid>
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
                      variant="h4"
                      fontWeight={600}
                      color="secondary"
                      elevation={8}
                    >
                      Questions
                    </Typography>

                    <Grid container sx={{ marginBottom: 2 }}>
                      <Grid item xs={0} md={0} lg={0}></Grid>

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
                        }}
                      >
                        <List
                          sx={{
                            p: 2,
                            overflow: "auto",
                            maxHeight: 450,
                          }}
                        >
                        {course.discussion &&
                          course.discussion.map((question) => (
                            <ListItem disablePadding>
                              <QuestionCard responses={question.responses} qName={question.userID} qMajor="Computer Science" qText={question.text} aName="John Jones" aMajor="Statistics" aText="Dr. Chen is the best lecturer." />
                            </ListItem>
                          ))
                        }
                        </List>
                      </Grid>
                      <Grid item xs={0} md={0} lg={0}></Grid>
                    </Grid>

                    <Grid container sx={{ marginBottom: 2, marginTop: 2 }}>
                      <Grid item xs={2} md={2} lg={2}></Grid>

                      <Grid
                        item
                        xs={8}
                        md={8}
                        lg={8}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<QuestionAnswer />}
                          elevation={8}
                          type="submit"
                          onSubmit={() =>
                            this.addQuestion(course.courseID, this.state.student.email, textQuestion, "")
                          }
                        >
                          Ask a Question
                        </Button>
                      </Grid>
                      <Grid item xs={2} md={2} lg={2}></Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={0} md={2} lg={3}></Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Copyright sx={{ margin: 5 }} />
      </ThemeProvider>
    );
  }
}

export default CourseView;
