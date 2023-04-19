import { Component } from "react";
import Copyright from "./Copyright";
import CourseService from "../services/CourseService";
import StudentService from "../services/StudentService";
import APIService from "../services/APIService";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HelpIcon from "@mui/icons-material/Help";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import { mainListItems, secondaryListItems } from "./listItems";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Carousel from "react-material-ui-carousel";
import borders from "@mui/system"

import {
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Paper,
  Grid,
  Container,
  Button,
  ButtonGroup,
  Card,
  ButtonBase,
  ListItem,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Circle,
  ConstructionOutlined,
  QuestionAnswer,
  ReplayCircleFilledOutlined,
  Reply,
  ReplyOutlined,
} from "@mui/icons-material";
import ChatService from "../services/ChatService";
import ReviewCard from "./ReviewCard";
import QuestionCard from "./QuestionCard";
import CourseCard from "./CourseCard";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./RecievedMessage";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      connectionID: this.props.match.params.connectionID,
      chat: {},
      text: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.toProfile = this.toProfile.bind(this);
  }

  componentDidMount() {
    ChatService.getChat(this.state.id, this.state.connectionID).then((res) => {
      this.setState({ chat: res.data });
    });
    ChatService.removeNotif(this.state.id, this.state.connectionID);
  }

  toProfile(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }

  handleInput(event) {
    const value = event.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  addMessage(id, text, messageId) {
    ChatService.addMessage(id, text, messageId);
  }

  render() {
    const { id, connectionID, chat, text } = this.state;

    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <AppBar>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <Button
                  onClick={() => {
                    this.toLandingpage(this.state.student.email);
                  }}
                >
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
                  disableElevation="true"
                  variant="contained"
                  color="secondary"
                  sx={{ marginRight: 50, p: 4 }}
                >
                  <Button
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
                  <Button
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
                    this.toDashboard(this.state.student.email);
                  }}
                >
                  <Badge badgeContent={4} color="secondary">
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

              <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                {/* Top Wide Container and Paper */}
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                  <Grid item xs={12} md={10} lg={10}>
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
                      <Grid container spacing={1} sx={{ marginBottom: 0 }}>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                        <Grid item xs={8} md={8} lg={8}>
                          <Typography
                            variant="h3"
                            color="secondary"
                            fontWeight={700}
                          >
                            Chat
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}></Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={0} md={1} lg={1}></Grid>
                </Grid>

                {/* Bottom Containers and Papers */}
                <Grid container spacing={3} sx={{ marginBottom: 0 }}>
                  <Grid item xs={2} md={2} lg={2}></Grid>
                  {/* Bottom Left Container and Paper - Classmates List */}
                  <Grid item xs={11} md={3} lg={3}>
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
                      <Typography variant="h4">Classmates</Typography>
                      <List>
                        <ListItem>
                          <Typography>John Smith</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>Bill Jones</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>Adam Evans</Typography>
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>

                  
                  {/* Bottom Right Container and Paper - Chat View */}
                  <Grid item xs={11} md={5} lg={5}>
                      <Grid component={Paper} container spacing={0} sx={{backgroundColor: "primary", marginBottom: 0, paddingBottom: 2, paddingTop: 2, marginTop: 0 }}>
                            <Grid
                              item
                              xs={2}
                              md={2}
                              lg={2}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <Avatar
                                src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                                alt="profilepic"
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  height: 45,
                                  width: 45,
                                }}
                              />
                            </Grid>

                            <Grid
                              item
                              xs={5}
                              md={5}
                              lg={5}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              <Typography color="secondary" fontWeight={600} variant="h5">John Smith</Typography>
                            </Grid>

                            <Grid
                              item
                              xs={5}
                              md={5}
                              lg={5}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            ></Grid>
                          </Grid>
                      <List sx={{padding: -2, width: 466, backgroundColor: '#1b1b1b', overflow:"auto", maxHeight: 300, marginTop: 1}}>
                        {/* Top Chat ID Bar */}
                        {/* <Grid container spacing={1} sx={{ marginBottom: 0, backgroundColor: '#1b1b1b', paddingBottom: 1 }}>
                            <Grid
                              item
                              xs={2}
                              md={2}
                              lg={2}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <Avatar
                                src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                                alt="profilepic"
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  height: 45,
                                  width: 45,
                                }}
                              />
                            </Grid>

                            <Grid
                              item
                              xs={5}
                              md={5}
                              lg={5}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              <Typography fontWeight={600} variant="h5">John Smith</Typography>
                            </Grid>

                            <Grid
                              item
                              xs={5}
                              md={5}
                              lg={5}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            ></Grid>
                          </Grid> */}

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                            <Grid item xs={6} md={6} lg={6}>
                              <SentMessage message="Hello, world!" />
                            </Grid>
                          </Grid>
                        </ListItem>

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}>
                              <ReceivedMessage message="Hello, world!" />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                          </Grid>
                        </ListItem>

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                            <Grid item xs={6} md={6} lg={6}>
                              <SentMessage message="Hello, world!" />
                            </Grid>
                          </Grid>
                        </ListItem>

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}>
                              <ReceivedMessage message="Hello, world!" />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                            <Grid item xs={6} md={6} lg={6}>
                              <SentMessage message="Hello, world!" />
                            </Grid>
                          </Grid>
                        </ListItem>

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}>
                              <ReceivedMessage message="Hello, world!" />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                            <Grid item xs={6} md={6} lg={6}>
                              <SentMessage message="Hello, world!" />
                            </Grid>
                          </Grid>
                        </ListItem>

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}>
                              <ReceivedMessage message="Hello, world!" />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                            <Grid item xs={6} md={6} lg={6}>
                              <SentMessage message="Hello, world!" />
                            </Grid>
                          </Grid>
                        </ListItem>

                        <ListItem>
                          <Grid container>
                            <Grid item xs={6} md={6} lg={6}>
                              <ReceivedMessage message="Hello, world!" />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                          </Grid>
                        </ListItem>

                        {/* Text input + send button */}
                        
                      </List>
                          <Grid component={Paper} container spacing={0} sx={{backgroundColor: "primary", marginBottom: 0, marginTop: 1, paddingBottom: 2, paddingTop: 2 }}>
                            <Grid
                              item
                              xs={10}
                              md={10}
                              lg={10}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              <TextField fullWidth color="secondary" variant="filled" focused sx={{marginLeft: 2, marginRight: 2, backgroundColor: "#1b1b1bF"}}></TextField>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              md={2}
                              lg={2}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                textAlign: "left",
                                verticalAlign: "middle",
                                paddingLeft: 1
                              }}
                            >
                              <IconButton style={{backgroundColor: "#EBD99F", color: "#1b1b1b"}}><SendIcon/></IconButton>
                            </Grid>
                          </Grid>
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}></Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default Chat;
