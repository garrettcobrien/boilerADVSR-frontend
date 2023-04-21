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
  Box,
} from "@mui/material";
import theme from "../theme";
import Navbar from "./Navbar";
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

  render() {
    const { id, student, planOfStudy, semesters, coursesIncomplete } =
      this.state;
    const notifications = this.state.student.notifications;

    return (
      <div>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <Container
              component="main"
              maxwidth="xs"
              alignItems="center"
              justifyContent="center"
              sx={{ padding: 15 }}
            >
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
                  <Button onClick={() => this.toAddSemester(id, "", "")}>
                    Add a Semester
                  </Button>
                  <Typography color="secondary">Plan of Study</Typography>
                  <Typography color="secondary">
                    Cumulative GPA: {Math.round(planOfStudy.gpa * 100) / 100}
                  </Typography>
                  <Typography color="secondary">
                    Completed Semesters:
                  </Typography>
                  <ul className="list-group" color="secondary">
                    {planOfStudy.semesters &&
                      planOfStudy.semesters.map((semester, index) => (
                        <li className={"list-group-item "} key={index}>
                          <div>
                            {semester.year}-{semester.season}
                          </div>
                          <div>GPA-{Math.round(semester.gpa * 100) / 100}</div>
                          {semester.courses.map((course, index) => (
                            <li className={"list-group-item "} key={index}>
                              {course.courseID}
                            </li>
                          ))}
                          <Button
                            onClick={() =>
                              this.toAddSemester(
                                id,
                                semester.year,
                                semester.season
                              )
                            }
                          >
                            Edit
                          </Button>
                        </li>
                      ))}
                  </ul>
                  <br></br>
                  <Typography component="h3" color="secondary">
                    Requirements not fulfilled:
                  </Typography>
                  <ul className="list-group" color="secondary">
                    {coursesIncomplete &&
                      coursesIncomplete.map((requirement, index) => (
                        <li className={"list-group-item "} key={index}>
                          {requirement.name}
                          {requirement.courses.map((course, index) => (
                            <li className={"list-group-item "} key={index}>
                              {course.courseID}
                            </li>
                          ))}
                        </li>
                      ))}
                  </ul>
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
