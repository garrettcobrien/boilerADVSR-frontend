import { Component } from "react";
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { MenuItem, Select, Typography } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";

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
            this.setState({planOfStudy: res.data})
        });
        APIService.getDepartments().then((res) => {
            this.setState({departments: res.data});
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
            this.setState({departments: res.data});
        });
        //this.forceUpdate();
    }

    handleChangeDep(e) {
        this.setState({dep: e.target.value});
    }
    handleChangeType(e) {
        this.setState({type: e.target.value});
    }
    search(dep, type) {
        APIService.getDegreeList(dep, type).then((res) => {
            this.setState({degrees: res.data});
        })
    }

    render() {
        const { student, type, dep, departments, degrees, planOfStudy} = this.state;
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
                Next Step to Completing Your Account
              </Typography>
              <Typography
                color="text"
                variant="h6"
                fontWeight={400}
              >
                Let's add your majors, minors, or concentrations.
              </Typography>
            </Container>
          <Container sx={{ padding: 0 }}>
          <Typography
                color="secondary"
                variant="h5"
                fontWeight={700}
                style={{paddingBottom: 35}}
              >
                Search Degrees by Department and Type then Add to List Below
              </Typography>
              <Form >
                    <FormGroup >
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
                                <label className="list-group-item" >
                                    <Typography color="black">{degree.degreeTitle}</Typography>
                                    <button label="add"  onClick={() => this.removeDegree(this.state.id, degree.degreeTitle, "true")}>add</button>
                                </label>
                            ))
                        }
                    </FormGroup>
                </Form>
                <br></br>
                <Form>
                    <Typography color="secondary" variant="h4">Degrees added below</Typography>
                    <FormGroup>
                        {/* Getting degrees */}
                       {planOfStudy.degrees?.map((degree) => (
                        <div>
                            <Label for="degree">
                                <Typography focused color="secondary">{degree.degreeTitle}</Typography>
                            </Label> {degree.degreeType}
                            <Button type="submit" onClick={ () => this.removeDegree(this.state.id, degree.degreeTitle, "false")}>Remove</Button>
                        </div>
                       ))} 
                       <Button
                            style={{ marginTop: 10 }}
                            variant="contained"
                            color="secondary"
                            type="button"
                            onClick={() => this.toAddSemester(this.state.id, "", "")}                  
                            >
                            <Typography color="primary">Next Step</Typography>
                        </Button>{" "}
                    </FormGroup>
                </Form>        
          </Container>
        </ThemeProvider>

        </div>
        );
    }
}
export default Degrees;