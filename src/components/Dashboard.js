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
        const { student } = this.state;
        return (
            <div>
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
                    </div>
                    <br></br>
                </div>
                
            </div>
        );
    }
}

export default Dashbaord;