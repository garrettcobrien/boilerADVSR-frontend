import { Component } from "react";
import StudentService from "../services/StudentService";
import { Form, FormGroup, Input, Label, FormFeedback, Button } from 'reactstrap';
import { Container, AppBar, Toolbar, ButtonGroup, Badge, Avatar, Typography, ThemeProvider, MenuItem, Select, Card, InputLabel, TextField, CssBaseline} from "@mui/material";
import theme from '../theme'
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
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        });
        StudentService.getPlanofStudy(this.state.id).then((res) => {
            this.setState({planOfStudy: res.data});
        })
        StudentService.getStudentIncompleted(this.state.id).then( res => {
            this.setState({coursesIncomplete: res.data});
        });
    }

    toDashboard(id) {
        this.props.history.push(`/students/dashboard/${id}`);
    }
    toAddSemester(id, year, season) {
        if (year !== "" && season !== "") {
            this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
        }
        else {
            this.props.history.push(`/students/addsemester/${id}/new/new`);
        }
    }

    render() {
        const {  id, student, planOfStudy, semesters, coursesIncomplete } = this.state;
        const notifications = this.state.student.notifications;

        return(
            <div>
                <ThemeProvider theme={theme}> 
                
                <Container component="main" maxwidth="xs" alignItems="center" justifyContent="center" sx={{padding: 15}}>
                <AppBar>
                    <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                    >
                    <Button onClick={() => {this.toLandingpage(this.state.student.email);}}>
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
                <br></br>
                 <div className="table">
                 <Button onClick={() => this.toAddSemester(id, "", "")}>Add a Semester</Button>
                    <Typography color="secondary">Plan of Study</Typography>
                    <Typography color="secondary">Cumulative GPA: {Math.round(planOfStudy.gpa * 100)/100}</Typography>
                    <Typography color="secondary">Completed Semesters:</Typography>
                    <ul className="list-group" color="secondary">
                        {planOfStudy.semesters &&
                            planOfStudy.semesters.map((semester, index) => (
                                <li
                                    className={
                                        "list-group-item "
                                    }
                                    key={index}
                                >
                                    <div>{semester.year}-{semester.season}</div><div>GPA-{Math.round(semester.gpa * 100)/100}</div>
                                    {semester.courses.map((course, index) => (
                                     <li
                                        className={
                                             "list-group-item "
                                        }
                                        key={index}
                                    >   
                                        {course.courseID}
                                    </li>
                                    ))}
                                    <Button onClick={() => this.toAddSemester(id, semester.year, semester.season)}>Edit</Button>
                                </li>
                            ))}
                    </ul>
                    <br></br>
                    <Typography component="h3" color="secondary">Requirements not fulfilled:</Typography>
                    <ul className="list-group" color="secondary">
                        {coursesIncomplete &&
                            coursesIncomplete.map((requirement, index) => (
                                <li
                                    className={
                                        "list-group-item "
                                    }
                                    key={index}
                                >
                                    {requirement.name}
                                    {requirement.courses.map((course, index) => (
                                     <li
                                        className={
                                             "list-group-item "
                                        }
                                        key={index}
                                    >   
                                        {course.courseID}
                                    </li>
                                    ))}
                                </li>
                            ))}
                    </ul>
                </div>
                </Container>
                </ThemeProvider>
            </div>
        );
    };

}
export default PlanOfSudy;