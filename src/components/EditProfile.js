import { Component } from "react";
import { Form, FormGroup,  Input, Label, FormFeedback } from 'reactstrap';
import { Container, CssBaseline, Button, InputAdornment, MenuItem, Select, TextField, ThemeProvider, Typography, Grid, ListItem, List, Table, TableBody, TableRow, TableCell, IconButton, } from '@mui/material'
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from '@mui/icons-material/Password';
import AddIcon from "@mui/icons-material/Add";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import theme from "../theme";

class EditProfile extends Component {
    emptyItem = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        linkedIn: '',
        aboutMe: '',
        profilePicture: '',
        validate: {
            emailState: '',
        },

    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            item: this.emptyItem,
            planOfStudy: {},
            degree: '',
            type: '',
            dep: "",
            departments: [""],
            degrees: [],
            hasChanged: false,
            empty: ''
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
        StudentService.getStudentById(this.state.id).then(res => {
            this.setState({ student: res.data });
            this.setState({ item: res.data })
        });
        StudentService.getPlanofStudy(this.state.id).then(res => {
            this.setState({ planOfStudy: res.data })
        });
        APIService.getDepartments().then((res) => {
            this.setState({ departments: res.data });
        });
        this.forceUpdate();

    }


    handleChange(event) {
        const { target } = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
        this.setState({ hasChanged: true });
    }

    handleChangeDep(e) {
        this.setState({ dep: e.target.value });
    }
    handleChangeType(e) {
        this.setState({ type: e.target.value });
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
        StudentService.updateStudent(student, id).then(res => {
            this.setState({ student: res.data });
        });
        this.props.history.push(`/students/dashboard/${id}`);
    }

    saveInfo() {
        StudentService.updateStudent(this.state.item, this.state.id).then(res => {
            this.setState({ student: res.data });
        });
        this.setState({ hasChanged: false });
    }

    removeDegree(id, degree, text) {
        StudentService.changeDegree(id, degree, text).then((res) => {
            this.setState({ departments: res.data });
        });
        //this.forceUpdate();
    }

    search(dep, type) {
        APIService.getDegreeList(dep, type).then((res) => {
            this.setState({ degrees: res.data });
        })
    }

    render() {
        const { student, item, id, isLoading, planOfStudy, type, degree, dep, departments, degrees } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container
                        maxwidth="xs"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ padding: 10 }}
                    >
                        <Typography
                            color="secondary"
                            variant="h3"
                            fontWeight={700}
                        >
                            Edit Profile
                        </Typography>
                        <Form>
                            <FormGroup>
                                <TextField
                                    label="First Name"
                                    type="firstName"
                                    name="firstName"
                                    id="firstName"
                                    value={item.firstName || ''}
                                    onChange={this.handleChange}
                                    autoComplete="firstName"
                                    color="secondary"
                                    focused
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon fontSize="small" sx={{ color: '#ffffff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Last Name"
                                    type="lastName"
                                    name="lastName"
                                    id="lastName"
                                    value={item.lastName || ""}
                                    onChange={this.handleChange}
                                    autoComplete="lastname"
                                    color="secondary"
                                    focused
                                    sx={{ marginLeft: 5 }}
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon fontSize="small" sx={{ color: '#ffffff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={item.email || ''}
                                    onChange={(e) => {
                                        this.validateEmail(e);
                                        this.handleChange(e);
                                    }}
                                    color="secondary"
                                    focused
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineIcon fontSize="small" sx={{ color: '#ffffff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    sx={{ marginLeft: 5 }}
                                    value={item.password || ""}
                                    onChange={this.handleChange}
                                    autoComplete="password"
                                    color="secondary"
                                    focused
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PasswordIcon fontSize="small" sx={{ color: '#ffffff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    label="About Me"
                                    type="aboutMe"
                                    name="aboutMe"
                                    id="aboutMe"
                                    value={item.aboutMe || ""}
                                    onChange={this.handleChange}
                                    autoComplete="aboutMe"
                                    color="secondary"
                                    focused
                                    style={{ width: "505px" }}
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon fontSize="small" sx={{ color: '#ffffff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    label="LinkedIn"
                                    type="linkedIn"
                                    name="linkedIn"
                                    id="linkedIn"
                                    value={item.linkedIn || ""}
                                    onChange={this.handleChange}
                                    style={{ width: "505px" }}
                                    autoComplete="linkedIn"
                                    color="secondary"
                                    focused
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon fontSize="small" sx={{ color: '#ffffff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    label="About Me"
                                    type="profilePicture"
                                    name="profilePicture"
                                    id="profilePicture"
                                    value={item.profilePicture || ""}
                                    onChange={this.handleChange}
                                    autoComplete="profilePicture"
                                    color="secondary"
                                    focused
                                    style={{ width: "505px" }}
                                    variant="filled"
                                />
                            </FormGroup>
                            <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                                
                                    <Button variant="contained" disabled={!(this.state.hasChanged)} color="secondary" type="button" onClick={() => this.saveInfo()}>Search</Button>
                                
                            </Grid>
                        </Form>
                        <br></br>
                        <Form >
                            <Typography variant="h4" color="secondary" >Search Degrees to add by Department and Type</Typography>
                            <FormGroup>
                                {/* Adding more degrees */}
                                <Select id="category"  style={{backgroundColor: "gray", marginTop: 10}} displayEmpty label="Please Select a Type of Department" value={dep} onChange={this.handleChangeDep}>
                                    <MenuItem value="">Department</MenuItem>
                                    {departments &&
                                        departments.map((department) => (
                                            <MenuItem color="primary" key={department} value={department}> {department} </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Select sx={{marginLeft: 5}} label="Please Select a Type of Degree" displayEmpty style={{backgroundColor: "gray"}} value={type} onChange={(e) => this.handleChangeType(e)}>
                                    <MenuItem value="">Type</MenuItem>
                                    <MenuItem key="major" value="MAJOR">Major</MenuItem>
                                    <MenuItem key="minor" value="MINOR">Minor</MenuItem>
                                    <MenuItem key="concentration" value="CONCENTRATION">Concentration</MenuItem>
                                </Select>
                                <Button variant="contained" color="secondary" type="button" sx={{marginLeft: 5, fontSize: 20}} onClick={() => this.search(dep, type)}>Search</Button>
                                <Table style={{maxWidth: "400px"}}>
                                    <TableBody>
                                {degrees &&
                                    degrees.map((degree) => (
                                        <TableRow>
                                            <TableCell>
                                            {degree.degreeTitle} {" "}
                                            <IconButton
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                type="submit"
                                                onClick={() => this.removeDegree(id, degree.degreeTitle, "true")}
                                            >
                            <AddIcon />
                          </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                </TableBody>
                                </Table>
                            </FormGroup>
                        </Form>
                        <br></br>
                        <Form>
                            <Typography variant="h4" color="secondary" sx={{marginTop: 5}}>Degrees Already Added</Typography>
                            <Table style={{maxWidth: "400px"}}>
                                <TableBody>
                                {/* Getting degrees */}
                                {planOfStudy.degrees?.map((degree) => (
                                    <TableRow>
                                        <TableCell>
                                            {degree.degreeTitle}{" "}
                                            <Button color="secondary" type="submit" onClick={() => this.removeDegree(id, degree.degreeTitle, "false")}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Form>
                        <Form>
                            <Button sx={{marginTop: 10}} variant="contained" color="secondary" type="submit" onClick={() => this.handleSubmit(student, id)} >Update Profile</Button>{' '}
                        </Form>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }

}

export default EditProfile;