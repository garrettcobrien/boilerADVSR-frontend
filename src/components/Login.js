/*
    Containing an email and password inputs to login and a link under
    to create a new account
*/
import React, { Component } from "react";
import { Link, Redirect, withRouter } from 'react-router-dom';
import {Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from '../theme.js';

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
            <div>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxwidth="xs" alignItems="center" justifyContent="center" sx={{padding: 15}}>
                        <Typography sx={{ fontWeight: 10000, fontSize: 50, marginBottom: 5}} color="secondary">Login</Typography>
                        <Form>
                            <FormGroup>
                                <Typography color='#ffffff'><Label for="email">Email</Label></Typography>
                                <Input type="email" name="email" id="email" value={item.email}
                                    onChange={this.handleInputChange} autoComplete="email"/>
                            </FormGroup>
                            <FormGroup>
                                <Typography color='#ffffff'><Label for="password">Password</Label></Typography>
                                <Input type="password" name="password" id="password" value={item.password}
                                    onChange={this.handleInputChange} autoComplete="password"/>
                            </FormGroup>
                            <FormGroup>
                                <Button variant="contained" color="secondary" style={{marginLeft: "10px", marginTop: 10}} onClick={ () => this.loginStudent(item.email)} className="btn btn-info"><Typography color="primary">Log In</Typography></Button>
                                <div style={{paddingTop: 20}}>
                                    <Typography color='#ffffff'>Don't have an account? <a href="/students/new">Sign up here!</a></Typography>
                                </div>
                            </FormGroup>
                        </Form>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
};

export default Login;