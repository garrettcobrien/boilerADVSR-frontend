import { TextField } from "@mui/material";
import { Component } from "react";
import { FormGroup } from "reactstrap";
import CourseService from "../services/CourseService";

class AddSemester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            semester: {
                year:'',
                season:'',
                gpa:'',
                qualityPoints:'',
                creditHours:'',
                courses: [],
            },
        }
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then((res) => {
          this.setState({ student: res.data });
        });
    }

    handleChangeCourses(e, index) {
        const course = {};
        CourseService.getCourse(e.target.value).then((res) => {
            course = res.data;
        });
        this.state.courses[index] = course;
        console.log(this.state.courses);
        this.setState({courses: this.state.courses});
    }

    handleChange(event) {
        const { target } = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    handleSubmit(semester) {
        console.log(semester);
    }

    render() {
        const { student, semester } = this.state;
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
                    Let's set up another semester.
                  </Typography>
                </Container>
              <Container sx={{ padding: 0 }}>
              <Typography
                    color="secondary"
                    variant="h3"
                    fontWeight={700}
                    style={{paddingBottom: 35}}
                  >
                    Add Semester
                  </Typography>
                <Form>
                  <FormGroup>
                    <TextField
                      label="Year"
                      type="year"
                      name="year"
                      id="year"
                      value={semester.year || ""}
                      onChange={this.handleChange}
                      autoComplete="year"
                      color="secondary"
                      focused
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeOutlinedIcon fontSize="small" sx={{color: '#ffffff'}} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Season"
                      type="season"
                      name="season"
                      id="season"
                      value={semester.season|| ""}
                      onChange={this.handleChange}
                      autoComplete="season"
                      color="secondary"
                      focused
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeOutlinedIcon fontSize="small" sx={{color: '#ffffff'}} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      label="Credit Hours"
                      type="creditHours"
                      name="creditHours"
                      id="creditHours"
                      value={semester.creditHours || ""}
                      onChange={this.handleChange}
                      autoComplete="creditHours"
                      color="secondary"
                      focused
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordIcon fontSize="small" sx={{color: '#ffffff'}} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="GPA"
                      type="gpa"
                      name="gpa"
                      id="gpa"
                      value={semester.gpa || ""}
                      onChange={this.handleChange}
                      autoComplete="gpa"
                      color="secondary"
                      focused
                      sx={{ marginLeft: 5 }}
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordIcon fontSize="small" sx={{color: '#ffffff'}} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    {
                        semester.courses.map((course, index) => {
                            return (
                                <div key={index}>
                                    <TextField 
                                        onChange={(e) => this.handleChangeCourses(e, index)}
                                        value={course}
                                    
                                    />
                                </div>
                            )
                        })
                    }
                  </FormGroup>
                  <FormGroup>
                    <Button
                      style={{ marginTop: 10 }}
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={() => this.handleSubmit(semester)}
                    >
                      <Typography color="primary">Submit</Typography>
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