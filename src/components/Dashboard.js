import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from '../services/StudentService'
import {Container, ThemeProvider, Button, Typography, Card, Grid } from '@mui/material'
import theme from '../theme'

class Dashbaord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},

            courses: [],
            reviews: [],
            currentCourse: null,
            currentIndex: -1,
            searchDepartment: ""
        };

        this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
        this.setActiveCourse = this.setActiveCourse.bind(this);
        this.searchDepartment = this.searchDepartment.bind(this);
        this.toLandingpage = this.toLandingpage.bind(this);
    }

    componentDidMount(){
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        })
        StudentService.getSuggestedSemester(this.state.id).then( res => {
            this.setState({courses: res.data});
        })
    }

    onChangeSearchDepartment(e) {
        const searchDepartment = e.target.value;
        
        this.setState({
            searchDepartment: searchDepartment
        });
    }

    setActiveCourse(course, index) {
        this.setState({
            currentCourse: course,
            currentIndex: index
        });
    }

    searchDepartment() {
        CourseService.getDepartment(this.state.searchDepartment)
        .then(response => {
            this.setState({
                courses: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    toLandingpage(id) {
        this.props.history.push(`/students/landingpage/${id}`);
    }

    render() {
        const { student, id } = this.state;
        return (
            <div>
                <ThemeProvider theme={theme}>
                <Container sx={{padding: 10, justifyContent: "center"}}>
                    <Card sx={{justifyContent: "center", maxWidth: '100vh'}}>
                        <Grid container spacing={0} direction="column" alignItems="center" style={{ minHeight: '50vh'}}>
                            <Grid item>
                                <Typography sx={{ fontWeight: 10000, fontSize: 50, marginBottom: 5 }} color='#ffffff'>Profile Details</Typography>
                            </Grid>
                            <Grid item>
                                <Typography> Student First Name: </Typography> <div> { student.firstName }</div>
                            </Grid>
                            <Grid item>
                                <Typography> Student Last Name: </Typography> <div> { student.lastName }</div>
                            </Grid>
                            <Grid item>
                                <Typography> Student Email: </Typography> <div> { student.email }</div>
                            </Grid>
                        </Grid>
                    <br></br>
                    </Card>
                </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default Dashbaord;