import { Component } from "react";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";
import ChatService from "../services/ChatService";

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
            rating:"",
            chat: {},
        };

        this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
        this.setActiveCourse = this.setActiveCourse.bind(this);
        this.searchDepartment = this.searchDepartment.bind(this);
        this.toLandingpage = this.toLandingpage.bind(this);
        this.addReview = this.addReview.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.getSuggestedSemester = this.getSuggestedSemester.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.courseRec = this.courseRec.bind(this);
        this.getChatID = this.getChatID.bind(this);
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

    addQuestion(courseID, id, text, rating, desc) {
        CourseService.addQuestion(courseID, id, text, rating, desc);
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

    courseRec(id, connectionID, courseID, chat) {
        console.log("dfs");
        ChatService.sendCourse(id, courseID, chat.id);
    }

    getChatID(id, connectionID, chat) {
        ChatService.getChat(id, connectionID).then( res => {
            this.setState({chat: res.data});
            console.log("Course sent to " + connectionID + " chat id: " + chat.id);
        })
    }

    render() {
        const { searchDepartment, courses, coursesSuggested, currentCourse, currentIndex, id, text, rating, chat} = this.state;
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
                        <label>
                            <strong>Discussions:</strong>
                        </label>{" "}
                        <div>
                            
                            {currentCourse.discussion &&
                                currentCourse.discussion.map((question, index) => (
                                    <ul key={index}>
                                        <div>
                                            <p>Question ID: {question.id}</p>
                                        </div>
                                        <div>
                                            <p>Name of questioner: {question.userID}</p>
                                        </div>
                                        <div>
                                            <p>Review: {question.text}</p>
                                        </div>
                                        <div>
                                            {question.responses &&
                                                question.responses.map((response) => (
                                                    <ul><li>
                                                        <div>
                                                            <p>Name of response: {response.userID}</p>
                                                        </div>
                                                        <div>
                                                            <p>Answer: {response.text}</p>
                                                        </div>
                                                    </li></ul>
                                                ))
                                            }
                                        </div>
                                        <>Post a Response</>
                                        <form onSubmit={ () => this.addQuestion(currentCourse.courseID, id, text, question.id)}>
                                            <input type="text" name="text" id="text" placeholder="Enter your response here" value={text} onChange={this.handleInput}/>
                                            <button type="submit">Submit</button>
                                        </form>
                                    </ul>
                                ))}
                            <>Post a Question</>
                            <form onSubmit={ () => this.addQuestion(currentCourse.courseID, id, text, "")}>
                                <input type="text" name="text" id="text" placeholder="Enter question" value={text} onChange={this.handleInput}/>
                                <button type="submit">Submit</button>
                            </form>
                            <br></br>
                            <>Recommend to a Friend?</>
                            
                                <input type="text" name="text" id="text" placeholder="Enter connection to recommend" value={text} onChange={this.handleInput}/>
                                <button type="button" onClick={ () => this.getChatID(id, text, chat)}>Get ID!</button>
                                <button type="button" onClick={ () => this.courseRec(id, text, currentCourse.courseID, chat)}>Send!</button>
                           
                            <br></br>
                        </div>
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