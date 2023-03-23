import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from '../services/StudentService'


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



    render() {
        const { searchDepartment, courses, currentCourse, currentIndex } = this.state;
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Student Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Student First Name: </label>
                            <div> { this.state.student.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Student Last Name: </label>
                            <div> { this.state.student.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Student Email ID: </label>
                            <div> { this.state.student.email }</div>
                        </div>
                    </div>
                    <br></br>
                </div>
                <div className="col-md-8">
                    <br></br>
                    <h4>Suggested Courses List</h4>
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
                        </div>

                        </div>
                    ) : (
                        <div>
                        <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashbaord;