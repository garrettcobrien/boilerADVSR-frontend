import { Component } from "react";
import Copyright from "./Copyright";
import StudentService from "../services/StudentService";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import {
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Paper,
  Grid,
  Container,
  Button,
  ButtonGroup,
} from "@mui/material";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},

      anchorElNav: null,
      anchorElUser: null,
    };

    this.drawerWidth = 240;
    this.pages = ["Find a Course", "Suggest a Semester", "Review a Course"];

    this.toProfile = this.toProfile.bind(this);
    this.toSearchCourses = this.toSearchCourses.bind(this);
    this.toPlanofstudy = this.toPlanofstudy.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
  }

  toggleDrawer() {
    this.state.open = !this.state.open;
  }

  toProfile(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }
  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toSearchCourses(id){
    this.props.history.push(`/students/courses/${id}`);
  }

  toPlanofstudy(id) {
    this.props.history.push(`/students/planofstudy/${id}`);
  }
  toEditProfile(id) {
    this.props.history.push(`/students/editprofile/${id}`);
  }

  setAnchorElNav(target) {
    this.setState({
      anchorElNav: target,
    });
  }

  setAnchorElUser(target) {
    this.setState({
      anchorElUser: target,
    });
  }

  handleOpenNavMenu(event) {
    this.setAnchorElNav(event.currentTarget);
  }

  handleOpenUserMen(event) {
    this.setAnchorElUser(event.currentTarget);
  }

  handleCloseNavMenu() {
    this.setAnchorElNav(null);
  }

  handleCloseUserMenu() {
    this.setAnchorElUser(null);
  }

  render() {
    const { student } = this.state;
    const notifications = this.state.student.notifications;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
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

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={0} md={2} lg={3}></Grid>
                <Grid item xs={12} md={8} lg={6}>
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
                  >
                    <Typography color="secondary" variant="h3" fontWeight={700}>
                      Welcome Back {this.state.student.firstName}
                    </Typography>
                    <Typography variant="h6" fontWeight={500} color="text">
                      What would you like to do?
                    </Typography>
                    <Stack paddingTop={2} spacing={2}>
                      <Button color="secondary" variant="contained" onClick={() => {this.toSearchCourses(this.state.student.email);}}>
                        Find a Course
                      </Button>
                      <Button color="secondary" variant="contained">
                        Suggest a Semester
                      </Button>
                      <Button color="secondary" variant="contained">
                        Review a Course
                      </Button>
                      <Button color="secondary" variant="contained" onClick={ () => this.toProfile(student.email)}>
                        View My Profile
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={0} md={2} lg={3}></Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Copyright sx={{ margin: 5 }} />
      </ThemeProvider>
    );
  }
}

export default LandingPage;
