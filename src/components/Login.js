/*
    Containing an email and password inputs to login and a link under
    to create a new account
*/
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import StudentService from "../services/StudentService";


class Login extends Component{
    emptyItem = {
        email: '',
        password: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginStudent = this.loginStudent.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    handleInputChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    loginStudent(id){
        //implement attemping to get the first to see if it exists before sending them to dashboard
        StudentService.getStudentById(id).then( res => {
            this.setState({item: res.data});
            this.props.history.push(`/students/landingpage/${id}`);
        }).catch(function (error) {
            alert("Incorrect email or password");
            console.log(error.toJSON());
        });
    }

    forgotPassword(id) {
        StudentService.getStudentById(id).then( res => {
            StudentService.resetPasswordLink(id);
            //alert("Request to change password has been set!");
        }).catch(function (error) {
            alert("Account does not exist");
            console.log(error.toJSON());
        });
    }


    render () {
        const {item} = this.state;
        return (
            <Container>
                <h1>Login</h1>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" value={item.email}
                               onChange={this.handleInputChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={item.password}
                               onChange={this.handleInputChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button style={{marginLeft: "10px"}} onClick={ () => this.loginStudent(item.email)} className="btn btn-info">Login</Button>
                        <Button style={{marginLeft: "10px"}} onClick={ () => this.forgotPassword(item.email)} className="btn btn-info">Forgot Password</Button>

                        <div>
                            <Link to="/students/new/" >Dont have an account Signup here!</Link>
                        </div>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
};

export default Login;