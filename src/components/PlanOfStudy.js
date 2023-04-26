import { Component } from "react";
import StudentService from "../services/StudentService";
import {
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Box,
  Button,
  ButtonGroup,
  Badge,
  Avatar,
  Typography,
  ThemeProvider,
  MenuItem,
  Select,
  Card,
  InputLabel,
  TextField,
  CssBaseline,
  IconButton,
  Autocomplete,
  FormControl,
  FormGroup,
  Dialog,
} from "@mui/material";
import theme from "../theme";
import Navbar from "./Navbar";
import Copyright from "./Copyright";
import SemesterTile from "./SemesterTile";
import { Add, PausePresentation } from "@mui/icons-material";
class PlanOfSudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},
      planOfStudy: {},
      semesters: [],
      coursesIncomplete: [],
      newSeason: "",
      newYear: "",
      open: false,
    };
    this.toDashboard = this.toDashboard.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addSemester = this.addSemester.bind(this);
  }

  addSemester() {
    StudentService.addEmptySem(
      this.state.id,
      this.state.year,
      this.state.season
    );
    this.handleClose();
  }

  setOpen(val) {
    this.setState({ open: val });
  }

  handleClickOpen() {
    this.setOpen(true);
  }

  handleClose() {
    this.setOpen(false);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
    StudentService.getPlanofStudy(this.state.id).then((res) => {
      this.setState({ planOfStudy: res.data });
    });
    StudentService.getStudentIncompleted(this.state.id).then((res) => {
      this.setState({ coursesIncomplete: res.data });
    });
  }

  toDashboard(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }
  toAddSemester(id, year, season) {
    if (year !== "" && season !== "") {
      this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
    } else {
      this.props.history.push(`/students/addsemester/${id}/new/new`);
    }
  }

  handleSeasonChange(event) {
    this.setState({ newSeason: event.target.value });
  }

  handleYearChange(event) {
    this.setState({ newYear: event.target.value });
  }

  render() {
    const { id, student, planOfStudy, coursesIncomplete } = this.state;
    const notifications = this.state.student.notifications;

    console.log(this.state.planOfStudy);

    let newSeason = "";
    let newYear = "";

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Navbar id={this.state.id} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            <Container sx={{ mt: 10, mb: 4 }}>
              <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                    elevation={8}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                        marginBottom: 2,
                      }}
                      variant="h3"
                      fontWeight={700}
                      color="secondary"
                    >
                      Plan Of Study
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                <Grid item lg={2}></Grid>
                {planOfStudy.semesters?.map((semester) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={2}
                    sx={{
                      paddingTop: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <SemesterTile id={id} semester={semester} />
                  </Grid>
                ))}
                <Grid item lg={2}></Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                sx={{ marginBottom: 2, marginLeft: 0 }}
              >
                <Grid item xs={4} md={4} lg={4}></Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  lg={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                      marginBottom: 3,
                      width: "auto"
                    }}
                  >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        color="secondary"
                      >
                        Add New Semester
                      </Typography>
                    <FormControl
                      style={{ margin: 0, marginBottom: 2 }}
                      onSubmit={() => this.addSemester()}
                      sx={{
                        paddingTop: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                        marginLeft: 0,
                      }}
                    >
                      <InputLabel title="Year"></InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.newSeason}
                        label="Season"
                        onChange={(e) => this.handleSeasonChange(e)}
                        color="secondary"
                        sx={{ marginLeft: 0, marginBottom: 2 }}
                      >
                        <MenuItem value={"FALL"}>Fall</MenuItem>
                        <MenuItem value={"SPRING"}>Spring</MenuItem>
                        <MenuItem value={"SUMMER"}>Summer</MenuItem>
                      </Select>
                      <InputLabel title="Year"></InputLabel>
                      <TextField
                        label="Year"
                        type="year"
                        name="year"
                        id="year"
                        value={this.state.newYear}
                        onChange={(e) => this.handleYearChange(e)}
                        autoComplete="year"
                        color="secondary"
                        focused
                        variant="filled"
                        sx={{ marginLeft: 0, marginBottom: 2 }}
                      />
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#EBD99F" }}
                        sx={{ marginLeft: 0, marginBottom: 2 }}
                      >
                        Submit
                      </Button>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={4} md={4} lg={4}></Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Copyright sx={{ margin: 5 }} />
      </ThemeProvider>
    );
  }
}
export default PlanOfSudy;
