import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";
import { Container, AppBar, Toolbar, ButtonGroup, Badge, Avatar, Typography, Button, ThemeProvider, MenuItem, Select, Card, InputLabel, TextField} from "@mui/material";

import theme from '../theme'

class SearchCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},

            courses: [],
            coursesSuggested: [],
            reviews: [],
            currentCourse: null,
            currentIndex: -1,
            searchDepartment: "",
            text: "",
            rating:""
        };

        this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
        this.setActiveCourse = this.setActiveCourse.bind(this);
        this.searchDepartment = this.searchDepartment.bind(this);
        this.toLandingpage = this.toLandingpage.bind(this);
        this.addReview = this.addReview.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.getSuggestedSemester = this.getSuggestedSemester.bind(this);
        this.toCoursepage = this.toCoursepage.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
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

    addReview(courseID, id, text, rating) {
        CourseService.addReview(courseID, id, text, rating);
    }

    toLandingpage(id) {
        this.props.history.push(`/students/landingpage/${id}`);
    }
    toCoursepage(id, courseID) {
        this.props.history.push(`/course/${id}/${courseID}`);
    }
    

    handleInput (event) {
        const value = event.target.value;
        console.log(value);
        this.setState({
          ...this.state,
          [event.target.name]: value,
        });
      }
    
    //{TODO       !!!!!!!!!!!
    //Uncomment add course to backlog function in student service
    addCourse(id, currentCourse) {
        StudentService.addToBacklog(id, currentCourse);
    }

    getSuggestedSemester(id, sort) {
        StudentService.getSuggestedSemester(id, sort).then( res => {
            this.setState({coursesSuggested: res.data});
        });
        this.forceUpdate();
    }

    render() {
        const { student, searchDepartment, courses, coursesSuggested, currentCourse, currentIndex, id, text, rating} = this.state;
        const notifications = this.state.student.notifications;

        return (
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

                <Button onClick={ () => this.toLandingpage(id)}>Back to landing page</Button>
                <br></br>
                    <Card alignItems="center" justifyContent="center" sx={{padding: 5}}>
                        <br></br>
                        <Typography variant="h3">Suggested Courses List</Typography>
                        <InputLabel>Sorting Category</InputLabel>
                        <Select label="Please Select a Sorting Category" onChange={ (e) => this.getSuggestedSemester(id, e.target.value)}>
                            <MenuItem key="rating" value="rating">Rating</MenuItem>
                            <MenuItem key="avgGPA" value="avgGPA">Average GPA</MenuItem>
                        </Select>
                        <ul className="list-group">
                            {coursesSuggested &&
                                coursesSuggested.map((course, index) => (
                                    <li
                                        className={
                                            "list-group-item " + 
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => {this.toCoursepage(student.email, course.courseID)}}
                                        key={index}
                                    >
                                       <Typography color="primary"> {course.courseID} </Typography>
                                    </li>
                                ))}
                        </ul>
                <br></br>
                <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Search by department"
                    value={searchDepartment}
                    onChange={this.onChangeSearchDepartment}
                />
                <div className="input-group-append">
                    <Button sx={{margin: 2}} type="button" variant="contained" onClick={this.searchDepartment}>
                        Search
                    </Button>          
                </div>
                <br></br>
                <div className="col-md-8">
                    <Typography>Searched Courses List</Typography>
                    
                    <ul className="list-group">
                        {courses &&
                            courses.map((course, index) => (
                                <li
                                    className={
                                        "list-group-item " + 
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => {this.toCoursepage(student.email, course.courseID)}}
                                    key={index}
                                >
                                    <Typography color="primary"> {course.courseID} </Typography>
                                </li>
                            ))}
                    </ul>
                </div>
                <br></br>
                </Card>
                </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default SearchCourses;