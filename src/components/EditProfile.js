import { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { MenuItem, Select, TextField, } from '@mui/material'
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";

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
            planOfStudy: {},
            degree: '',
            type: '',
            dep: '',
            departments: [""],
            degrees: [],
            hasChanged: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDep = this.handleChangeDep.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.search = this.search.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
    }

    componentDidMount() {
        console.log("edit");
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        });
        StudentService.getPlanofStudy(this.state.id).then(res => {
            this.setState({planOfStudy: res.data})
        });
        APIService.getDepartments().then((res) => {
            this.setState({departments: res.data});
        });
        this.forceUpdate();

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let student = {...this.state.student};
        student[name] = value;
        console.log("render");

        this.setState({student});
        this.setState({hasChanged: true});
    }

    handleChangeDep(e) {
        this.setState({dep: e.target.value});
    }
    handleChangeType(e) {
        this.setState({type: e.target.value});
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

    saveInfo() {
        StudentService.updateStudent(this.state.student, this.state.id).then( res => {
            this.setState({student: res.data});
        });
        this.setState({hasChanged: false});
    }

    removeDegree(id, degree, text) {
        StudentService.changeDegree(id, degree, text).then((res) => {
            this.setState({departments: res.data});
        });
        //this.forceUpdate();
    }

    search(dep, type) {
        APIService.getDegreeList(dep, type).then((res) => {
            this.setState({degrees: res.data});
        })
    }

    render() {
        const { student, id, isLoading, planOfStudy, type, degree, dep, departments, degrees } = this.state;
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
                        <Label for="aboutMe">About Me</Label>
                        <Input type="aboutmM" name="aboutMe" id="aboutMe" value={student.aboutMe || ''}
                               onChange={this.handleChange} autoComplete="aboutMe"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="linkedIn">LinkedIn</Label>
                        <Input type="linkedIn" name="linkedIn" id="linkedIn" value={student.linkedIn || ''}
                               onChange={this.handleChange} autoComplete="linkedIn"/>
                    </FormGroup>
                    <Button disabled={!(this.state.hasChanged)} onClick={() => this.saveInfo()}>Save Input Changes</Button>
                </Form>
                <br></br>
                <Form >
                    <Label>Search Degrees to add by Department and Type</Label>
                    <FormGroup>
                        {/* Adding more degrees */}
                        <Select id="category" label="Please Select a Type of Department" value={dep} onChange={this.handleChangeDep}>
                            {departments &&
                                departments.map((department) => (
                                    <MenuItem color="primary" key={department} value={department}> {department} </MenuItem>
                                ))
                            }
                        </Select>
                        <Select label="Please Select a Type of Degree" value={type} onChange={ (e) => this.handleChangeType(e)}>
                            <MenuItem key="major" value="MAJOR">Major</MenuItem>
                            <MenuItem key="minor" value="MINOR">Minor</MenuItem>
                            <MenuItem key="concentration" value="CONCENTRATION">Concentration</MenuItem>
                        </Select>
                        <Button onClick={() => this.search(dep, type)}>Search</Button>
                        {degrees &&
                            degrees.map((degree) => (
                                <label className="list-group-item">
                                    {degree.degreeTitle}
                                    <button label="add"  onClick={() => this.removeDegree(id, degree.degreeTitle, "true")}>add</button>
                                </label>
                            ))
                        }
                    </FormGroup>
                </Form>
                <br></br>
                <Form>
                    <Label>Degrees added below</Label>
                    <FormGroup>
                        {/* Getting degrees */}
                       {planOfStudy.degrees?.map((degree) => (
                        <div>
                            <Label for="degree">
                                {degree.degreeTitle}
                            </Label> {degree.degreeType}
                            <Button type="submit" onClick={ () => this.removeDegree(id, degree.degreeTitle, "false")}>Remove</Button>
                        </div>
                       ))} 
                    </FormGroup>
                </Form>
                <Button color="primary" type="submit" onClick={ () => this.handleSubmit(student, id)} >Update</Button>{' '}
            </Container>
            </div>
        );
    }

}

export default EditProfile;