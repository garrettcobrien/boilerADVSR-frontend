import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from '../services/StudentService'
import {Container, Box, ThemeProvider, Button, Typography, Card, Grid, Table } from '@mui/material'
import theme from '../theme'

class Dashbaord extends Component {

    constructor(props) {
        this.state = {
            id: this.props.match.params.id,
            student: {},

            courses: [],
            reviews: [],
            currentCourse: null,
            currentIndex: -1,
            searchDepartment: ""
        };
        this.drawerWidth = 240;

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
                                    <Grid item>
                                        <Typography> About Me: </Typography> <div> { student.aboutMe }</div>
                                    </Grid>
                                    <Grid item>
                                        <Typography> Linkedin: </Typography> <div> { student.linkedIn }</div>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{margin: 2}} onClick={ () => this.toEditProfile(id)}>Edit Your Profile</Button>
                                        <Button variant="contained" sx={{margin: 2}} onClick={ () => this.toPlanofstudy(id)}>View Plan of Study</Button>
                                        <Button variant="contained" sx={{margin: 2}} onClick={ () => this.delete(id)}>Delete Account</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Box>
                        
                        <h3>Course Backlog</h3>
                            <Table className="mt-4">
                                <thead>
                                <tr>
                                    <th width="50%">Name</th>
                                    <th width="50%">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {student.courseList}
                                </tbody>
                            </Table>
                        <br></br>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default Dashbaord;