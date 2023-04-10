import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";
import { Container, Typography, Button, ThemeProvider, MenuItem, Select, Card, InputLabel, TextField} from "@mui/material";
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

    handleInput (event) {
        const value = event.target.value;
        console.log(value);
        this.setState({
          ...this.state,
          [event.target.name]: value,
        });
      }
    
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
        const { searchDepartment, courses, coursesSuggested, currentCourse, currentIndex, id, text, rating} = this.state;
        return (
            <div>
                <ThemeProvider theme={theme}>
                <Container component="main" maxwidth="xs" alignItems="center" justifyContent="center" sx={{padding: 15}}>
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
                                        onClick={ () => this.setActiveCourse(course, index)}
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
                </Card>
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
                                    onClick={ () => this.setActiveCourse(course, index)}
                                    key={index}
                                >
                                    {course.courseID}
                                </li>
                            ))}
                    </ul>
                </div>
                <br></br>
                <div className="col-md-6">
                    {currentCourse ? (
                        <div>
                            <Typography>Course</Typography>
                        <div>
                            <br></br>
                            <Button type="button" onClick={ () => this.addCourse(id, currentCourse)}>Add to course backlog</Button>
                        </div>
                        <div>
                            <Typography>
                                <strong>Title:</strong>
                            </Typography>{" "}
                            {currentCourse.courseID}
                        </div>
                        <div>
                            <Typography>
                                <strong>Description:</strong>
                            </Typography>{" "}
                            {currentCourse.courseTitle}
                        </div>
                        <div>
                            <Typography>
                                <strong>Average Rating:</strong>
                            </Typography>{" "}
                            {currentCourse.averageRating}
                        </div>
                        <div>
                            <Typography>
                                <strong>Average GPA:</strong>
                            </Typography>{" "}
                            {currentCourse.averageGPA}
                        </div>

                        <div>
                            <Typography>
                                <strong>Reviews:</strong>
                            </Typography>{" "}
                            

                            <ul >
                                {currentCourse.reviews &&
                                    currentCourse.reviews.map((review, index) => (
                                        <li
                                            key={index}
                                        >
                                            <div>
                                                <p>Name of reviewer: {review.studentReviewer}</p>
                                            </div>
                                            <div>
                                                <p>Review: {review.reviewText}</p>
                                            </div>
                                            <div>
                                                <p>Rating: {review.overallRating}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <form onSubmit={ () => this.addReview(currentCourse.courseID, id, text, rating)}>
                                <input type="text" name="text" id="text" placeholder="Enter review" value={text} onChange={this.handleInput}/>
                                <input type="text" name="rating" id="rating" placeholder="Enter rating" value={rating} onChange={this.handleInput}/>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <br></br>
                        </div>
                    ) : (
                        <div>
                        <br />
                            <p>Please click on a Course...</p>
                        </div>
                    )}
                </div>
                </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default SearchCourses;