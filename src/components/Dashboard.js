import { Component } from "react";
import StudentService from '../services/StudentService'


class Dashbaord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {}
        };
        
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        })
    }


    render() {
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

                </div>
            </div>
        )
    }
}

export default Dashbaord;