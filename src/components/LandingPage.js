import { Component } from "react";
import StudentService from "../services/StudentService";

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
                <br></br>
                <div className = "card col-md-6 offset-md-3">
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
                </div>
            </div>
        );
    }

}

export default LandingPage