import { Component } from "react";
import StudentService from "../services/StudentService";
import { Container, ThemeProvider, Grid, Typography, Button } from "@mui/material";
import theme from '../theme'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
        }

        this.toSearchCourses = this.toSearchCourses.bind(this);
        this.toProfile = this.toProfile.bind(this);
    }

    componentDidMount(){
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        })
    }

    toSearchCourses(id){
        this.props.history.push(`/students/courses/${id}`);
    }

    toProfile(id) {
        this.props.history.push(`/students/dashboard/${id}`);
    }

    render() {
        const {student} = this.state;
        return (
            <div>
                <ThemeProvider theme={theme}>
                <Container sx={{padding: 15}}>
                {/* <div>
                <br></br>
                    <h3 className = "text-center">Home</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Welcome Back! </label>
                            <div> { student.firstName }</div>
                        </div>
                    </div>
                    <br></br>
                    <div>What would you like to do: </div>
                    <br></br>
                    <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={ () => this.toSearchCourses(student.email)}
                        >
                            Search Courses
                    </button>
                    <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={ () => this.toProfile(student.email)}
                        >
                            Profile
                    </button>
                </div> */}
                <Grid container spacing={0} direction="column" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: 10000, fontSize: 50, marginBottom: 5 }} color="secondary">Welcome Back</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5" color='#ffffff'>What would you like to do?</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={ () => this.toSearchCourses(student.email)} color="secondary" variant="contained" size="large" sx={{m: 4 }} style={{fontSize: '24px', maxWidth: '180px', maxHeight: '180px', minWidth: '180px', minHeight: '180px'}}>Search Courses</Button>
                    <Button onClick={ () => this.toProfile(student.email)} color="secondary" variant="contained" size="large" sx={{m: 4 }} style={{fontSize: '24px', maxWidth: '180px', maxHeight: '180px', minWidth: '180px', minHeight: '180px'}}>View My Profile</Button>
                </Grid>
            </Grid>
                </Container>
                </ThemeProvider>
            </div>
        );
    }

}

export default LandingPage