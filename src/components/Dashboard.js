import { Component } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import StudentService from '../services/StudentService'


class Dashbaord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},

            courses: [],
            currentCourse: null,
            linkedin: ""
        };
        this.toLandingpage = this.toLandingpage.bind(this);
        this.toPlanofstudy = this.toPlanofstudy.bind(this);
        this.toEditProfile = this.toEditProfile.bind(this);
        this.remove = this.remove.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        console.log("dashboard");
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
            this.setState({courses: res.data.backLog});
        })
        this.forceUpdate();
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

    remove(courseID) {
        let updatedStudents = [...this.state.courses].filter(i => i.courseID !== courseID);
        this.setState({courses: updatedStudents});
        
    }

    render() {
        const { student, id, isLoading, courses } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const courseList = courses.map(course => {
            return <tr key={course.courseID}>
                <td style={{whiteSpace: 'nowrap'}}>{course.courseID}</td>
                
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(course.courseID)}>Delete</Button>
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
                    <button onClick={ () => this.toEditProfile(id)}>Edit Your Profile</button>
                    <button onClick={ () => this.toPlanofstudy(id)}>View Plan of Study</button>
                    <button onClick={ () => this.delete(id)}>Delete Account</button>
                </div>
            </div>
        );
    }
}

export default Dashbaord;