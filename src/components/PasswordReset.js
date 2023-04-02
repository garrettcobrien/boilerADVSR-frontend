import { Component } from "react";
import StudentService from "../services/StudentService";

class PasswordReset extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            password: '',
            student: {}
        }
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        });   
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let student = {...this.state.student};
        student[name] = value;
        console.log("render");

        this.setState({student});
    }

    handleSubmit(password, id) {
        StudentService.resetPassword(password, id).then( res => {
            this.setState({student: res.data});
        });
        this.props.history.push(`/`);
    }

    render() {
        const { student, id } = this.state;
        return (
            <div>
                <input type="password" name="password" id="password" value={student.password || ''}
                    onChange={this.handleChange} placeholder="Enter your new password" />
                <button type="submit" onClick={ () => this.handleSubmit(student.password, id)}>Reset Password</button>
            </div>
        )
    }
}

export default PasswordReset