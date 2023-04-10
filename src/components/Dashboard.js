import { Component } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import CourseService from "../services/CourseService";
import StudentService from '../services/StudentService'


class Dashbaord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            planOfStudy: {},
            degrees: [],
            courses: [],
            currentCourse: null,
            linkedin: "",
            text: "",
            connectionID: ""
        };
        this.toLandingpage = this.toLandingpage.bind(this);
        this.toPlanofstudy = this.toPlanofstudy.bind(this);
        this.toEditProfile = this.toEditProfile.bind(this);
        this.remove = this.remove.bind(this);
        this.delete = this.delete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addRequest = this.addRequest.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.toChat = this.toChat.bind(this);
    }

    componentDidMount() {
        console.log("dashboard");
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
            this.setState({courses: res.data.backLog});
        });
        StudentService.getPlanofStudy(this.state.id).then( res => {
            this.setState({planOfStudy: res.data});
            this.setState({degrees: res.data.degrees});
        });
        
        
        this.forceUpdate();
    }

    handleInput (event) {
        const value = event.target.value;
        console.log(value);
        this.setState({
          ...this.state,
          [event.target.name]: value,
        });
    }

    toLandingpage(id) {
        this.props.history.push(`/students/landingpage/${id}`);
    }

    toPlanofstudy(id) {
        this.props.history.push(`/students/planofstudy/${id}`);
    }
    toEditProfile(id) {
        this.props.history.push(`/students/editprofile/${id}`);
    }
    delete(id) {
        StudentService.deleteStudent(id);
        this.props.history.push('/');
    }
    toChat(id, connectionID) {
        this.props.history.push(`/students/chat/${id}/${connectionID}`)
    }

    remove(id, courseID) {
            StudentService.removeBacklog(id, courseID).then( res => {
                this.setState({courses: res.data});
            })
        this.props.history.push(`/students/landingpage/${id}`);
    }

    handleRequest(id, connectionID, status) {
        StudentService.handleRequest(id, connectionID, status);
        this.props.history.push(`/students/landingpage/${id}`);
    }
    
    addRequest(id, text) {
        StudentService.requestConnection(id, text);
        this.props.history.push(`/students/landingpage/${id}`);
    }

    render() {
        const { student, id, isLoading, courses, degrees, text } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const courseList = courses.map(course => {
            return <tr key={course.courseID}>
                <td style={{whiteSpace: 'nowrap'}}>{course.courseID}</td>
                
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(id, course.courseID)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        const requestList = student.connectionRequests?.map(request => {
            return <tr key={request}>
                <td style={{whiteSpace: 'nowrap'}}>{request}</td>
                
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.handleRequest(id, request, "accept")}>Accept</Button>
                        <Button size="sm" color="danger" onClick={() => this.handleRequest(id, request, "")}>Decline</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    

        return (
            <div>
                <button onClick={ () => this.toLandingpage(id)}>Back to landing page</button>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Student Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Student First Name: </label>
                            <div> { student.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Student Last Name: </label>
                            <div> { student.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Student Email ID: </label>
                            <div> { student.email }</div>
                        </div>
                        <div className="row">
                            <label>About Me: </label>
                            <div>{student.aboutMe}</div>
                        </div>
                        <div className="row">
                            <label>LinkedIn: </label>
                            <a href={student.linkedIn}>LinkedIn</a>
                        </div>
                        {degrees && 
                            degrees.map((degree, index) => (
                                <div>
                                {degree.degreeType}-{degree.degreeTitle}
                                </div>
                            ))}
                    </div>
                    <br></br>
                    <h3>Course Backlog</h3>
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th width="50%">Name</th>
                                <th width="50%">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courseList}
                            </tbody>
                        </Table>
                    <br></br>
                    <h3>Active Connections:</h3>
                        {student.connectionsIds &&
                            student.connectionsIds.map((request, index) => (
                                <div key={index}>
                                    {request}
                                <button type="submit" onClick={() => this.toChat(id, request)}>chat</button>
                                </div>
                            ))}
                    <br></br>
                    <h3>Current Requests:</h3>
                    <div>{student.connectionRequests && requestList}</div>
                    <div>
                        <>Send Friend Request</>
                        <form onSubmit={ () => this.addRequest(id, text)}>
                            <input type="text" name="text" id="text" placeholder="Enter question" value={text} onChange={this.handleInput}/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <br></br>
                    <button onClick={ () => this.toEditProfile(id)}>Edit Your Profile</button>
                    <button onClick={ () => this.toPlanofstudy(id)}>View Plan of Study</button>
                    <button onClick={ () => this.delete(id)}>Delete Account</button>
                </div>
            </div>
        );
    }
}

export default Dashbaord;