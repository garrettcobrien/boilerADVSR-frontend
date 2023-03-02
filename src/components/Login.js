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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
      }

    async handleSubmit (e) {
        e.preventDefault();
        const {item} = this.state;
        await fetch('/students' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        /* Send them too create their profile page */
        this.props.history.push('/students/dashboard');
    };

    render () {
        const {item} = this.state;
        return (
            <Container>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">email</Label>
                        <Input type="email" name="email" id="email" value={item.email}
                               onChange={this.handleInputChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={item.password}
                               onChange={this.handleInputChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" tag={Link} to={"/students/dashboard/" + item.email}>Login</Button>{' '}
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