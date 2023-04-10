import { Component } from "react";
import StudentService from "../services/StudentService";
import { Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { ThemeProvider, Container, Typography } from "@mui/material";
import theme from '../theme'
class PlanOfSudy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            planOfSudy: {},
            semesters: [],
            coursesIncomplete: [],
        };
        this.toDashboard = this.toDashboard.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        });
        StudentService.getCompletedSemesters(this.state.id).then( res => {
            this.setState({semesters: res.data});
        });
        StudentService.getStudentIncompleted(this.state.id).then( res => {
            this.setState({coursesIncomplete: res.data});
        });
    }

    toDashboard(id) {
        this.props.history.push(`/students/dashboard/${id}`);
    }

    render() {
        const {  id, student, planOfSudy, semesters, coursesIncomplete } = this.state;
        return(
            <div>
                <ThemeProvider theme={theme}>
                <Container component="main" maxwidth="xs" alignItems="center" justifyContent="center" sx={{padding: 15}}>
                 <div className="table">
                    <Typography>Plan of Study</Typography>
                    <Typography>Cumulative GPA: {student.gpa}</Typography>
                    <Typography>Completed Semesters:</Typography>
                    <ul className="list-group">
                        {semesters &&
                            semesters.map((semester, index) => (
                                <li
                                    className={
                                        "list-group-item "
                                    }
                                    key={index}
                                >
                                    <div>{semester.year}-{semester.season}</div><div>GPA-{semester.gpa}</div>
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
                                </li>
                            ))}
                    </ul>
                    <br></br>
                    <h4>Requirements to still complete:</h4>
                    <ul className="list-group">
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