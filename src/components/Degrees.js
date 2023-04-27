import { Component } from "react";
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
import { Form, FormGroup, Label } from "reactstrap";
import { FormControl, Button, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from "@mui/icons-material/Add";
import theme from "../theme";
import { withRouter } from "react-router-dom";

class Degrees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            planOfStudy: {},
            type: '',
            dep: '',
            departments: [],
            degrees: [],
        }

        this.handleChangeDep = this.handleChangeDep.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.search = this.search.bind(this);
        this.removeDegree = this.removeDegree.bind(this);
        this.toAddSemester = this.toAddSemester.bind(this);
    }

    componentDidMount() {
        this.forceUpdate();
        StudentService.getStudentById(this.state.id).then((res) => {
            this.setState({ student: res.data });
        });
        StudentService.getPlanofStudy(this.state.id).then(res => {
            this.setState({ planOfStudy: res.data })
        });
        APIService.getDepartments().then((res) => {
            this.setState({ departments: res.data });
        });
        this.forceUpdate();
    }

    toAddSemester(id, year, season) {
        if (year !== "" && season !== "") {
            this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
        }
        else {
            this.props.history.push(`/students/addsemester/${id}/new/new`);
        }
    }

    removeDegree(id, degree, text) {
        StudentService.changeDegree(id, degree, text).then((res) => {
            this.setState({ departments: res.data });
        });
        //this.forceUpdate();
    }

    handleChangeDep(e) {
        this.setState({ dep: e.target.value });
    }
    handleChangeType(e) {
        this.setState({ type: e.target.value });
    }
    search(dep, type) {
        APIService.getDegreeList(dep, type).then((res) => {
            this.setState({ degrees: res.data });
        })
    }

    render() {
        const { student, type, dep, departments, degrees, planOfStudy } = this.state;
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container
                        maxwidth="lg"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ padding: 10 }}>
                        <Typography
                            color="secondary"
                            variant="h3"
                            fontWeight={700}
                        >
                            Welcome to BoilerADVSR!
                        </Typography>
                        <Typography
                            color="text"
                            variant="h6"
                            fontWeight={400}
                        >
                            Next step let's add your majors, minors, or concentrations.
                        </Typography>
                    </Container>
                    <Container sx={{ padding: 0 }}>
                        <Typography
                            color="secondary"
                            variant="h5"
                            fontWeight={700}
                            style={{ paddingBottom: 35 }}
                        >
                            Search Degrees by Department and Type then Add to List Below
                        </Typography>
                        <Form >
                            <Typography variant="h4" color="secondary" >Search Degrees to add by Department and Type</Typography>
                            <FormGroup>
                                {/* Adding more degrees */}
                                <Select id="category" style={{ backgroundColor: "gray", marginTop: 10 }} displayEmpty label="Please Select a Type of Department" value={dep} onChange={this.handleChangeDep}>
                                    <MenuItem value="">Department</MenuItem>
                                    {departments &&
                                        departments.map((department) => (
                                            <MenuItem color="primary" key={department} value={department}> {department} </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Select sx={{ marginLeft: 5 }} label="Please Select a Type of Degree" displayEmpty style={{ backgroundColor: "gray" }} value={type} onChange={(e) => this.handleChangeType(e)}>
                                    <MenuItem value="">Type</MenuItem>
                                    <MenuItem key="major" value="MAJOR">Major</MenuItem>
                                    <MenuItem key="minor" value="MINOR">Minor</MenuItem>
                                    <MenuItem key="concentration" value="CONCENTRATION">Concentration</MenuItem>
                                </Select>
                                <Button variant="contained" color="secondary" type="button" sx={{ marginLeft: 5, fontSize: 20 }} onClick={() => this.search(dep, type)}>Search</Button>
                                <Table style={{ maxWidth: "400px" }}>
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
                                                            onClick={() => this.removeDegree(this.state.id, degree.degreeTitle, "true")}
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
                            <Typography variant="h4" color="secondary" sx={{marginTop: 5}}>Degrees Added Below</Typography>
                            <Table style={{maxWidth: "400px"}}>
                                <TableBody>
                                {/* Getting degrees */}
                                {planOfStudy.degrees?.map((degree) => (
                                    <TableRow>
                                        <TableCell>
                                            {degree.degreeTitle}{" "}
                                            <Button color="secondary" type="submit" onClick={() => this.removeDegree(this.state.id, degree.degreeTitle, "false")}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            <Button
                                style={{ marginTop: 10 }}
                                variant="contained"
                                color="secondary"
                                type="button"
                                onClick={() => this.toAddSemester(this.state.id, "", "")}
                            >
                                <Typography color="primary">Next Step</Typography>
                            </Button>{" "}
                        </Form>
                    </Container>
                </ThemeProvider>

            </div>
        );
    }
}
export default Degrees;