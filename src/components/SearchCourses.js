import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";

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
                
                <button onClick={ () => this.toLandingpage(id)}>Back to landing page</button>
                <br></br>
                <div className="col-md-8">
                    <br></br>
                    <h4>Suggested Courses List</h4>
                    <select onChange={ (e) => this.getSuggestedSemester(id, e.target.value)}>
                        <option>Please Choose a Sorting Option</option>
                        <option key="rating" value="rating">Rating</option>
                        <option key="avgGPA" value="avgGPA">Avereage Gpa</option>
                    </select>
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
                                    {course.courseID}
                                </li>
                            ))}
                    </ul>
                </div>
                <br></br>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by department"
                    value={searchDepartment}
                    onChange={this.onChangeSearchDepartment}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.searchDepartment}
                    >
                        Search
                    </button>

                </div>
                <br></br>
                <div className="col-md-8">
                    <h4>Searched Courses List</h4>
                    
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
                            <h4>Course</h4>
                        <div>
                            <br></br>
                            <button type="button" onClick={ () => this.addCourse(id, currentCourse)}>Add to course backlog</button>
                        </div>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentCourse.courseID}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentCourse.courseTitle}
                        </div>
                        <div>
                            <label>
                                <strong>Average Rating:</strong>
                            </label>{" "}
                            {currentCourse.averageRating}
                        </div>
                        <div>
                            <label>
                                <strong>Average GPA:</strong>
                            </label>{" "}
                            {currentCourse.averageGPA}
                        </div>

                        <div>
                            <label>
                                <strong>Reviews:</strong>
                            </label>{" "}
                            

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
            </div>
        );
    }
}

export default SearchCourses;