import { InputAdornment, TextField } from "@mui/material";
import { Component } from "react";
import { FormGroup, Form, Label } from "reactstrap";
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
} from "@mui/material";
import StudentService from "../services/StudentService";
import { SentimentSatisfiedOutlined } from "@mui/icons-material";

class AddSemester extends Component {
    emptySem = {
        year: '',
        season: '',
        courseId: '',
        grade: '',
        courses: [""],
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            semester: this.emptySem,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCourses = this.handleChangeCourses.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCourse = this.addCourse.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.year !== 'new') {
            StudentService.getStudentById(this.state.id).then((res) => {
                this.setState({ student: res.data });
            });
            StudentService.getSemester(this.props.match.params.id, this.props.match.params.season, this.props.match.params.year).then((res) => {
                this.setState({semester: res.data}); 
            });
        }
        
    }

    handleChangeCourses(e, index) {
        this.state.courses[index] = e.target.value;
        console.log(this.state.courses);
        this.setState({courses: this.state.courses});
    }

    handleChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        let semester = {...this.state.semester};
        semester[name] = value;
        this.setState({semester});
    }

    addCourse(id, semester) {
        const year = this.state.semester.year;
        const season = this.state.semester.season;
        console.log(id + " " + semester.year + " " + semester.season + " " + semester.courseId + " " + semester.grade);
        StudentService.addCourseSem(id, semester.year, semester.season, semester.courseId, semester.grade).then((res) => {
        });
        this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
    }

    handleSubmit(id, semester, courses) {
        this.props.history.push(`/students/planofstudy/${this.state.id}`);
    }

    render() {
        const { id, year, season, courseID, gpaGrade, semester, courses } = this.state;
        console.log(semester);
        return (
          <div>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Container
                    maxwidth="xs"
                    alignstudents="center"
                    justifyContent="center"
                    sx={{ padding: 10 }}>
                <Typography
                    color="secondary"
                    variant="h3"
                    fontWeight={700}
                  >
                    Need to update your transcript?
                  </Typography>
                  <Typography
                    color="text"
                    variant="h6"
                    fontWeight={400}
                  >
                    {this.props.match.params.year !== "new" ? 'Update your semester below.' : 'Lets set up another semester.'}
                  </Typography>
                </Container>
              <Container sx={{ padding: 0 }}>
              <Typography
                    color="secondary"
                    variant="h3"
                    fontWeight={700}
                    style={{paddingBottom: 35}}
                  >
                    {this.props.match.params.year !== "new" ? 'Edit Semester' : 'Add Semester'}
                  </Typography>
                <Form onSubmit={() => this.addCourse(id, semester)}>
                  <FormGroup>
                    <TextField
                      label="Year"
                      type="year"
                      name="year"
                      id="year"
                      value={semester.year}
                      onChange={(e) => this.handleChange(e)}
                      autoComplete="year"
                      color="secondary"
                      focused
                      variant="filled"
                    />
                    <TextField
                      label="Season"
                      type="season"
                      name="season"
                      id="season"
                      value={semester.season}
                      onChange={(e) => this.handleChange(e)}
                      autoComplete="seasons"
                      sx={{ marginLeft: 5 }}
                      color="secondary"
                      focused
                      variant="filled"
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                        label="Course Id"
                        type="courseId"
                        name="courseId"
                        id="courseId"
                        value={semester.courseId}
                        onChange={this.handleChange}
                        autoComplete="courseId"
                        color="secondary"
                        focused
                        variant="filled"
                    />
                    <TextField
                        label="GPA"
                        type="grade"
                        name="grade"
                        id="grade"
                        value={semester.grade}
                        onChange={this.handleChange}
                        autoComplete="grade"
                        color="secondary"
                        focused
                        sx={{ marginLeft: 5 }}
                        variant="filled"
                    />
                    <Button
                      style={{ marginTop: 10 }}
                      variant="contained"
                      color="secondary"
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
                    style={{paddingTop: 35}}
                  >
                    {semester.year ? 'Added Courses' : 'No courses have been added'}
                  </Typography>
                    {semester.courses && semester.courses[0] !== "" &&
                        semester.courses.map((course, index) => {
                            return (
                                <div>
                                <TextField
                                    label="Course Id"
                                    type="courseId"
                                    name="courseId"
                                    id="courseId"
                                    InputProps={{readOnly: true, }}
                                    value={course.courseID}
                                    onChange={this.handleChange}
                                    autoComplete="courseId"
                                    color="secondary"
                                    focused
                                    variant="filled"
                                />
                                <TextField
                                    label="GPA"
                                    type="grade"
                                    name="grade"
                                    id="grade"
                                    InputProps={{readOnly: true, }}
                                    value={course.grade}
                                    onChange={this.handleChange}
                                    autoComplete="grade"
                                    color="secondary"
                                    focused
                                    sx={{ marginLeft: 5 }}
                                    variant="filled"
                                />
                                </div>
                            );
                        })
                    }
                    </FormGroup>
                  <FormGroup>
                    <Button
                      style={{ marginTop: 10 }}
                      variant="contained"
                      color="secondary"
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

export default AddSemester