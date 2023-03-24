/*
    Containing an email and password inputs to login and a link under
    to create a new account
*/
import React, { Component } from "react";
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { useNavigate } from "react-router-dom";


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
        this.props.history.push(`/students/landingpage/${id}`);
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
                        <Button style={{marginLeft: "10px"}} onClick={ () => this.loginStudent(item.email)} className="btn btn-info">View </Button>
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