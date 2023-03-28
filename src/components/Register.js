/*
    Registers a USER account
    (student or teacher)
*/
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import AppNavbar from './AppNavbar';
import StudentService from '../services/StudentService';

class Register extends Component {

    emptyItem = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        validate: {
            emailState: '',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
    
    //create handle change for each input
    handleChange(event) {
        
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
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

    

    handleSubmit(item) {   
        /* Send them too create their profile page */
        StudentService.createStudent(item).then( res => {
            this.setState({student: res.data});
        })
        this.props.history.push(`/`);
    }
    

    render() {
        const {item} = this.state;
        return <div>
            <Container>
                <h1>Welcome New Student</h1>
                <Form>
                    <FormGroup>
                        <Label for="firstName">first name</Label>
                        <Input type="fristName" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">last name</Label>
                        <Input type="lastName" name="lastName" id="lastName" value={item.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">email</Label>
                        <Input type="email" name="email" id="email"  
                               valid={item.validate.emailState === "has-success"}
                               invalid={item.validate.emailState === "has-danger"}
                               value={item.email}
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
                        <Input type="password" name="password" id="password" value={item.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" onClick={ () => this.handleSubmit(item)} >Create</Button>{' '}
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default Register;