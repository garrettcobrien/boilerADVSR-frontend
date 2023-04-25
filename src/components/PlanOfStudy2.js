import { Component } from "react";
import StudentService from "../services/StudentService";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import {
  Container,
  AppBar,
  Toolbar,
  ButtonGroup,
  Badge,
  Avatar,
  Typography,
  ThemeProvider,
  MenuItem,
  Select,
  Card,
  InputLabel,
  TextField,
  CssBaseline,
  List,
  ListItem,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import theme from "../theme";
import Navbar from "./Navbar";
import { Link as RouterLink } from "react-router-dom";
class PlanOfSudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},
      planOfStudy: {},
      semesters: [],
      coursesIncomplete: [],
    };
    this.toDashboard = this.toDashboard.bind(this);
    this.toCourse = this.toCourse.bind(this);
    this.titleize = this.titleize.bind(this)
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
    StudentService.getPlanofStudy(this.state.id).then((res) => {
      this.setState({ planOfStudy: res.data });
    });
    StudentService.getStudentIncompleted(this.state.id).then((res) => {
      this.setState({ coursesIncomplete: res.data });
    });
  }

  titleize(course) {
    let len = course.length;
    let depLen = len - 5;
    return (
      course.substring(0, depLen) +
      " " +
      course.substring(depLen, course.length - 2)
    );
  }

  toCourse(id, courseId) {
    this.props.history.push(`/course/${id}/${courseId}`);
  }

  toDashboard(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }
  toAddSemester(id, year, season) {
    if (year !== "" && season !== "") {
      this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
    } else {
      this.props.history.push(`/students/addsemester/${id}/new/new`);
    }
  }

  gradeColor(gpa) {
    if (gpa === 4.0) {
      return "#079b55";
    } else if (gpa === 3.7) {
      return "#006b3d";
    } else if (gpa === 3.3) {
      return "#ff980e";
    } else if (gpa === 3.0) {
      return "#ff980e";
    } else if (gpa === 2.7) {
      return "#ff980e";
    } else if (gpa === 2.3) {
      return "#ff681f";
    } else if (gpa === 2.0) {
      return "#ff681f";
    } else if (gpa === 1.7) {
      return "#ff681f";
    } else if (gpa === 1.3) {
      return "#d2212b";
    } else if (gpa === 1.0) {
      return "#d2212b";
    } else if (gpa === 0.7) {
      return "#d2212b";
    } else if (gpa === 0.0) {
      return "#d2212b";
    }
  }

  toLetterGrade(gpa) {
    if (gpa == 4.0) {
      return "A";
    } else if (gpa === 3.7) {
      return "A-";
    } else if (gpa === 3.3) {
      return "B+";
    } else if (gpa === 3.0) {
      return "B";
    } else if (gpa === 2.7) {
      return "B-";
    } else if (gpa === 2.3) {
      return "C+";
    } else if (gpa === 2.0) {
      return "C";
    } else if (gpa === 1.7) {
      return "C-";
    } else if (gpa === 1.3) {
      return "D+";
    } else if (gpa === 1.0) {
      return "D";
    } else if (gpa === 0.7) {
      return "D-";
    } else if (gpa === 0.0) {
      return "F";
    }
  }

  render() {
    const { id, student, planOfStudy, semesters, coursesIncomplete } =
      this.state;
    const notifications = this.state.student.notifications;

    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box comp sx={{ display: "flex" }}>
            <Container sx={{ mt: 6, mb: 6 }}>
              <Navbar id={this.state.id} />
              <br></br>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
                }}
              >
                <div className="table">
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
                              Plan of Study
                            </Typography>
                          </Grid>
                          <Grid item xs={2} md={2} lg={2}></Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={0} md={1} lg={1}></Grid>
                  </Grid>

                  <Grid container spacing={1} sx={{ marginBottom: 2 }}>
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
                      <Typography
                        variant="h6"
                        color="secondary"
                        fontWeight={700}
                      >
                        Cumulative GPA:
                      </Typography>{" "}
                      <Typography variant="h6" color="#ffffff" fontWeight={500}>
                        {Math.round(planOfStudy.gpa * 100) / 100}
                      </Typography>
                    </Grid>
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
                      }}
                    >
                      <Typography variant="h4" color="#ffffff" fontWeight={600}>
                        Completed Semesters
                      </Typography>
                    </Grid>
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
                      <Button
                        color="#EBD99F"
                        style={{ backgroundColor: "#EBD99F", color: "primary" }}
                        onClick={() => this.toAddSemester(id, "", "")}
                      >
                        <Typography fontSize={16} fontWeight={400}>
                          Add a Semester
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    {planOfStudy.semesters &&
                      planOfStudy.semesters.map((semester, index) => (
                        <Grid item xs={4} md={4} lg={4} key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              justifyContent: "center",
                              textAlign: "center",
                              height: "100%",
                            }}
                          >
                            <Typography
                              color="secondary"
                              fontWeight={700}
                              fontSize={40}
                            >
                              {semester.season} {semester.year}
                            </Typography>
                            <Typography fontSize={18}>
                              Semester GPA:{" "}
                              {Math.round(semester.gpa * 100) / 100}
                            </Typography>
                            <List
                              sx={{ marginTop: 1, marginBottom: 2 }}
                              color="#ffffff"
                            >
                              {semester.courses.map((course, index) => (
                                <ListItem
                                  className={"list-group-item "}
                                  key={index}
                                  sx={{ backgroundColor: "#2a2a2a", p:0 }}
                                >
                                  <Grid container spacing={0} sx={{ p: 0 }}>
                                    <Grid
                                      item
                                      xs={4}
                                      md={4}
                                      lg={4}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "left",
                                        alignItems: "center",
                                        textAlign: "left",
                                        verticalAlign: "middle",
                                        p: 0,
                                        marginLeft: 0,
                                        marginTop:1,
                                        marginBottom:1
                                      }}
                                    >
                                      <Button
                                        onClick={() =>
                                          this.toCourse(
                                            this.state.id,
                                            course.courseID
                                          )
                                        }
                                        style={{
                                          backgroundColor: "#2a2a2a",
                                          p: 0,
                                        }}
                                        variant="text"
                                        color="#EBD99F"
                                        size="small"
                                      >
                                        <Typography
                                          color="#ffffff"
                                          fontSize={18}
                                          fontWeight={600}
                                        >
                                          {this.titleize(course.courseID)}
                                        </Typography>
                                      </Button>
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
                                      }}
                                    >
                                      <Typography
                                        color="#EBD99F"
                                        fontSize={12}
                                        fontWeight={600}
                                        sx={{ marginLeft: 1 }}
                                      >
                                        {course.courseTitle}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}></Grid>
                                    <Grid
                                      item
                                      xs={1}
                                      md={1}
                                      lg={1}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "left",
                                        alignItems: "center",
                                        textAlign: "left",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <Typography
                                        color={this.gradeColor(course.grade)}
                                        fontSize={18}
                                        fontWeight={500}
                                        sx={{ marginLeft: 0, marginRight: 1 }}
                                      >
                                        {this.toLetterGrade(course.grade)}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </ListItem>
                              ))}
                              <Divider />
                            </List>
                            <Button
                              color="#EBD99F"
                              style={{
                                backgroundColor: "#EBD99F",
                                color: "primary",
                              }}
                              onClick={() =>
                                this.toAddSemester(
                                  id,
                                  semester.year,
                                  semester.season
                                )
                              }
                            >
                              <Typography fontSize={16} fontWeight={400}>
                                Edit Semester
                              </Typography>
                            </Button>
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>
                  <br></br>
                  <Grid container spacing={1} sx={{ marginBottom: 2 }}>
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
                      <Typography
                        variant="h4"
                        color="#ffffff"
                        fontWeight={600}
                        sx={{ marginTop: 2, marginBottom: 2 }}
                      >
                        Requirements not Fulfilled
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    {coursesIncomplete &&
                      coursesIncomplete.map((requirement, index) => (
                        <Grid item xs={4} md={4} lg={4} key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              justifyContent: "center",
                              textAlign: "center",
                              height: "100%",
                            }}
                          >
                            <Typography
                              fontSize={20}
                              fontWeight={600}
                              color="#EBD99F"
                            >
                              {requirement.name}
                            </Typography>
                            <List sx={{ marginTop: 1, marginBottom: 2 }}>
                              {requirement.courses.map((course, index) => (
                                <ListItem
                                  className={"list-group-item "}
                                  key={index}
                                  sx={{ backgroundColor: "#2a2a2a" }}
                                >
                                  <Button
                                    onClick={() =>
                                      this.toCourse(
                                        this.state.id,
                                        course.courseID
                                      )
                                    }
                                    style={{ backgroundColor: "#2a2a2a" }}
                                    variant="contained"
                                    color="#ffffff"
                                  >
                                    <Typography
                                      color="#ffffff"
                                      fontSize={18}
                                      fontWeight={600}
                                    >
                                      {this.titleize(course.courseID)}
                                    </Typography>
                                  </Button>
                                  <Typography
                                    color="#EBD99F"
                                    fontSize={14}
                                    fontWeight={400}
                                    sx={{ marginLeft: 1 }}
                                  >
                                    {course.courseTitle}
                                  </Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}
export default PlanOfSudy;
