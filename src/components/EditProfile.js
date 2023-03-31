import { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import StudentService from "../services/StudentService";

class EditProfile extends Component {
    emptyItem = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        linkedIn: '',
        aboutMe: '',
        validate: {
            emailState: '',
        },
        
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: this.emptyItem,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("edit");
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        })
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

    validateEmail(e) {
        const emailRex = /[a-z0-9]@purdue\.edu$/;
    
        const { validate } = this.state.item;
    
        if (emailRex.test(e.target.value)) {
          validate.emailState = 'has-success';
        } else {
          validate.emailState = 'has-danger';
        }
    
        this.setState({ validate });
    }

    handleSubmit(student, id) {
        StudentService.updateStudent(student, id).then( res => {
            this.setState({student: res.data});
        });
        this.props.history.push(`/students/dashboard/${id}`);
    }

    render() {
        const { student, id, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
            <Container>
                <h1>Edit your profile</h1>
                <Form>
                    <FormGroup>
                        <Label for="firstName">first name</Label>
                        <Input type="fristName" name="firstName" id="firstName" value={student.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">last name</Label>
                        <Input type="lastName" name="lastName" id="lastName" value={student.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">email</Label>
                        <Input type="email" name="email" id="email"  
                               valid={student.validate === "has-success"}
                               invalid={student.validate === "has-danger"}
                               value={student.email}
                               onChange={(e) => {
                                 this.validateEmail(e);
                                 this.handleChange(e);
                               }}/>
                            <FormFeedback>
                                Uh oh! That is not a valid Purdue email.
                            </FormFeedback>
                            <FormFeedback valid>
                                That's a nice looking email you've got there.
                            </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={student.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aboutme">About Me</Label>
                        <Input type="aboutme" name="aboutme" id="aboutme" value={student.aboutMe || ''}
                               onChange={this.handleChange} autoComplete="aboutme"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="linkedin">LinkedIn</Label>
                        <Input type="linkedin" name="linkedin" id="linkedin" value={student.linkedIn || ''}
                               onChange={this.handleChange} autoComplete="linkedin"/>
                    </FormGroup>
                    <FormGroup>
                        
                    </FormGroup>
                    <Button color="primary" type="submit" onClick={ () => this.handleSubmit(student, id)} >Update</Button>{' '}
                </Form>
            </Container>
            </div>
        );
    }

}

export default EditProfile;