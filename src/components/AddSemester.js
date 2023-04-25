import { InputAdornment, InputLabel, TextField } from "@mui/material";
import { Component } from "react";
import { FormGroup, Form, Label, Input } from "reactstrap";
import CourseService from "../services/CourseService";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Paper,
  Grid,
  Container,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  List,
  ListItem,
} from "@mui/material";
import StudentService from "../services/StudentService";
import { SentimentSatisfiedOutlined } from "@mui/icons-material";

class AddSemester extends Component {
  emptySem = {
    year: "",
    season: "",
    courseId: "",
    grade: "",
    courses: [""],
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},
      semester: this.emptySem,
      season: "",
      year: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCourses = this.handleChangeCourses.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.changeSeason = this.changeSeason.bind(this);
    this.toCourse = this.toCourse.bind(this);
    this.titleize = this.titleize.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.year !== "new") {
      StudentService.getStudentById(this.state.id).then((res) => {
        this.setState({ student: res.data });
      });
      StudentService.getSemester(
        this.props.match.params.id,
        this.props.match.params.season,
        this.props.match.params.year
      ).then((res) => {
        this.setState({ semester: res.data });
      });
    }
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

  handleChangeCourses(e, index) {
    this.state.courses[index] = e.target.value;
    console.log(this.state.courses);
    this.setState({ courses: this.state.courses });
  }

  toCourse(id, courseId) {
    this.props.history.push(`/course/${id}/${courseId}`);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    let semester = { ...this.state.semester };
    semester[name] = value;
    this.setState({ semester });
  }

  changeSeason(event) {
    let newSemester = this.state.semester;
    newSemester.season = event.target.value;
    this.setState({ semester: newSemester });
  }

  addCourse(id, semester) {
    const year = this.state.semester.year;
    const season = this.state.semester.season;
    console.log(
      id +
        " " +
        semester.year +
        " " +
        semester.season +
        " " +
        semester.courseId +
        " " +
        semester.grade
    );
    StudentService.addCourseSem(
      id,
      semester.year,
      semester.season,
      semester.courseId,
      semester.grade
    ).then((res) => {});
    this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
  }

  handleSubmit(id, semester, courses) {
    this.props.history.push(`/students/planofstudy/${this.state.id}`);
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
    const { id, year, season, courseID, gpaGrade, semester, courses } =
      this.state;
    console.log(semester);
    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxwidth="xs"
            alignstudents="center"
            justifyContent="center"
            sx={{ padding: 10 }}
          >
            <Typography color="secondary" variant="h3" fontWeight={700}>
              Need to update your transcript?
            </Typography>
            <Typography color="text" variant="h6" fontWeight={400}>
              {this.props.match.params.year !== "new"
                ? "Update your semester below."
                : "Lets set up another semester."}
            </Typography>
          </Container>
          <Container sx={{ padding: 0 }}>
            <Typography
              color="secondary"
              variant="h3"
              fontWeight={700}
              style={{ paddingBottom: 35 }}
            >
              {this.props.match.params.year !== "new"
                ? "Edit Semester"
                : "Add Semester"}
            </Typography>
            <Form onSubmit={() => this.addCourse(id, semester)}>
              <FormGroup>
                <TextField
                  select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.semester.season}
                  label="Season"
                  sx={{ marginLeft: 0, width: 250, color: "#EBD99F" }}
                  onChange={this.changeSeason}
                  focused
                  variant="filled"
                  color="secondary"
                >
                  <MenuItem value={"FALL"}>Fall</MenuItem>
                  <MenuItem value={"SPRING"}>Spring</MenuItem>
                  <MenuItem value={"SUMMER"}>Summer</MenuItem>
                </TextField>
                <TextField
                  select
                  type="year"
                  name="year"
                  id="year"
                  label="Year"
                  value={this.state.semester.year}
                  onChange={(e) => this.handleChange(e)}
                  autoComplete="year"
                  color="secondary"
                  focused
                  variant="filled"
                  sx={{ marginLeft: 2, width: 250 }}
                >
                  <MenuItem value={2028}>2028</MenuItem>
                  <MenuItem value={2027}>2027</MenuItem>
                  <MenuItem value={2026}>2026</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2017}>2017</MenuItem>
                  <MenuItem value={2016}>2016</MenuItem>
                </TextField>
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Course ID  (No spaces, including trailing 0s)"
                  type="courseId"
                  name="courseId"
                  id="courseId"
                  value={semester.courseId}
                  onChange={this.handleChange}
                  autoComplete="courseId"
                  color="secondary"
                  focused
                  variant="filled"
                  sx={{ marginLeft: 0, width: 250 }}
                />
                {/* <TextField
                  label="GPA"
                  type="grade"
                  name="grade"
                  id="grade"
                  value={semester.grade}
                  onChange={this.handleChange}
                  autoComplete="grade"
                  color="secondary"
                  focused
                  sx={{ marginLeft: 2, width: 250 }}
                  variant="filled"
                /> */}
                <TextField
                  select
                  value={semester.grade}
                  label="Grade"
                  type="grade"
                  name="grade"
                  id="grade"
                  sx={{
                    marginLeft: 2,
                    marginRight: 2,
                    width: 250,
                    color: "#EBD99F",
                  }}
                  onChange={this.handleChange}
                  focused
                  variant="filled"
                  color="secondary"
                  defaultValue={4}
                >
                  <MenuItem value={4}>A+/A</MenuItem>
                  <MenuItem value={3.7}>A-</MenuItem>
                  <MenuItem value={3.3}>B+</MenuItem>
                  <MenuItem value={3}>B</MenuItem>
                  <MenuItem value={2.7}>B-</MenuItem>
                  <MenuItem value={2.3}>C+</MenuItem>
                  <MenuItem value={2}>C</MenuItem>
                  <MenuItem value={1.7}>C-</MenuItem>
                  <MenuItem value={1.3}>D+</MenuItem>
                  <MenuItem value={1}>D</MenuItem>
                  <MenuItem value={0.7}>D-</MenuItem>
                  <MenuItem value={0}>F</MenuItem>
                </TextField>
                <Button
                  style={{ backgroundColor: "#EBD99F", p: 0, marginTop: 10 }}
                  variant="contained"
                  type="submit"
                >
                  <Typography color="primary">Add Course</Typography>
                </Button>{" "}
              </FormGroup>
            </Form>
            <Form>
              <FormGroup>
                <Typography
                  color="secondary"
                  variant="h5"
                  fontWeight={700}
                  style={{ paddingTop: 35 }}
                >
                  {this.props.match.params.year !== "new"
                    ? "Added Courses"
                    : "No courses have been added"}
                </Typography>
                <List sx={{ marginTop: 1, marginBottom: 2 }} color="#ffffff">
                  {semester.courses &&
                    semester.courses[0] !== "" &&
                    semester.courses.map((course, index) => {
                      return (
                        <ListItem
                          className={"list-group-item "}
                          key={index}
                          sx={{
                            backgroundColor: "#2a2a2a",
                            p: 0.5,
                            width: 600,
                          }}
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
                              }}
                            >
                              <Button
                                onClick={() =>
                                  this.toCourse(this.state.id, course.courseID)
                                }
                                style={{
                                  backgroundColor: "#2a2a2a",
                                  color: "#2a2a2a",
                                }}
                                variant="text"
                              >
                                <Typography
                                  color="#ffffff"
                                  fontSize={27}
                                  fontWeight={600}
                                >
                                  {this.titleize(course.courseID)}
                                </Typography>
                              </Button>
                            </Grid>
                            <Grid
                              item
                              xs={7}
                              md={7}
                              lg={7}
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
                                fontSize={18}
                                fontWeight={400}
                                sx={{ marginLeft: 1 }}
                              >
                                {course.courseTitle}
                              </Typography>
                            </Grid>
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
                                fontWeight={400}
                                sx={{ marginLeft: 1, marginRight: 2 }}
                              >
                                {this.toLetterGrade(course.grade)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                </List>
              </FormGroup>
              <FormGroup>
                <Button
                  style={{ backgroundColor: "#EBD99F", p: 0, marginTop: 10 }}
                  variant="contained"
                  type="submit"
                  onClick={() => this.handleSubmit()}
                >
                  <Typography color="primary">Save</Typography>
                </Button>{" "}
              </FormGroup>
            </Form>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default AddSemester;
