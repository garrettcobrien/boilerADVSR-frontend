import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Container, AppBar, Toolbar, ButtonGroup, Badge, Avatar, Typography, Button, ThemeProvider, MenuItem, Select, Card, InputLabel, TextField} from "@mui/material";
import theme from '../theme'
import StudentService from '../services/StudentService';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {}
        }
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({student: res.data});
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { student } = this.state;
        const notifications = this.state.student.notifications;
        return (
            <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxwidth="xs" alignItems="center" justifyContent="center" sx={{padding: 15}}>
                <AppBar>
                    <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                    >
                    <Button onClick={() => {this.toLandingpage(this.state.student.email);}}>
                        <Typography
                        component="h1"
                        variant="h5"
                        noWrap
                        color="secondary"
                        sx={{ flexGrow: 1 }}
                        fontWeight={800}
                        >
                        BOILERADVSR
                        </Typography>
                    </Button>
                    <ButtonGroup
                        variant="contained"
                        color="secondary"
                        sx={{ marginRight: 50, p: 4 }}
                    >
                        <Button onClick={() => {this.toSearchCourses(this.state.student.email);}}
                        sx={{
                            backgroundColor: "#ffffff",
                            fontWeight: 700,
                            mr: 1,
                            ml: 1,
                        }}
                        >
                        Find a Course
                        </Button>
                        <Button
                        sx={{
                            backgroundColor: "#ffffff",
                            fontWeight: 700,
                            mr: 1,
                            ml: 1,
                        }}
                        >
                        Suggest a Semester
                        </Button>
                        <Button onClick={() => {this.toPlanofstudy(this.state.student.email);}}
                        sx={{
                            backgroundColor: "#ffffff",
                            fontWeight: 700,
                            mr: 1,
                            ml: 1,
                        }}
                        >
                        Plan of Study
                        </Button>
                        <Button
                        sx={{
                            backgroundColor: "#ffffff",
                            fontWeight: 700,
                            mr: 1,
                            ml: 1,
                        }}
                        >
                        Transcript
                        </Button>
                    </ButtonGroup>

                    <Button
                        color="inherit"
                        onClick={() => {
                        this.toProfile(this.state.student.email);
                        }}
                    >
                        <Badge badgeContent={notifications && notifications.length} color="secondary">
                        <Avatar
                            variant="circle"
                            src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                            alt="profilepic"
                            sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            verticalAlign: "middle",
                            height: 40,
                            width: 40,
                            }}
                        />
                        </Badge>
                    </Button>
                    </Toolbar>
                </AppBar>
                </Container>
                </ThemeProvider>
            </div>
        );
    }
}

