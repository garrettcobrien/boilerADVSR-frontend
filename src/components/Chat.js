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
import Navbar from "./Navbar";


class Chat extends Component {
  emptyStudent = {
    firstName: '',
    lastName: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      connectionID: this.props.match.params.connectionID,
      connectionStudent: this.emptyStudent,
      chat: {},
      student: {},
      text: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.toChat = this.toChat.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.connectionID === "new") {
      StudentService.getStudentById(this.props.match.params.id).then(res => {
        this.setState({ student: res.data });
      });
    }
    else {
      StudentService.getStudentById(this.props.match.params.id).then(res => {
        this.setState({ student: res.data });
      });
      ChatService.getChat(this.props.match.params.id, this.props.match.params.connectionID).then(res => {
        this.setState({ chat: res.data });
      });
      StudentService.getStudentById(this.props.match.params.connectionID).then(res => {
        this.setState({ connectionStudent: res.data });
      });
    }

  }

  toProfile(id) {
    this.props.history.push(`/students/dashboard/${id}`);
  }

  handleInput(event) {
    // const value = event.target.value;
    // console.log(value);
    // this.setState({
    //   ...this.state,
    //   [event.target.name]: value,
    // });
    const text = event.target.value;
    this.setState({ text: text });
  }

  addMessage(id, text, messageId) {
    ChatService.addMessage(id, text, messageId);
    window.location.reload(false);
    this.forceUpdate();
  }

  toChat(id, connectionID) {
    console.log("changed chat");
    this.props.history.push(`/students/chat/${id}/${connectionID}`);
    window.location.reload(false);
  }

  render() {
    const { id, connectionID, chat, text } = this.state;
    let avatar;
    if (this.state.connectionStudent.firstName !== "")
      avatar =
        <Grid item xs={11} md={5} lg={5}>
          <Grid component={Paper} container spacing={0} sx={{ backgroundColor: "primary", marginBottom: 0, paddingBottom: 2, paddingTop: 2, marginTop: 0 }}>
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

            </Grid>
            <Avatar
              src={this.state.connectionStudent.profilePicture}
              alt="profilepic"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                verticalAlign: "middle",
                height: 45,
                width: 45,
                marginRight: 2
              }}
            />
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
              <Typography color="secondary" fontWeight={600} variant="h5">{this.state.connectionStudent.firstName + " " + this.state.connectionStudent.lastName}</Typography>
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
          <List sx={{ padding: -2, width: 466, backgroundColor: '#1b1b1b', overflow: "auto", maxHeight: 300, marginTop: 1 }}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6}></Grid>
              {chat.messages &&
                chat.messages.map((message) => {

                  if (message.senderId === this.state.student.email)
                    return <ListItem>
                      <Grid container>
                        <Grid item xs={6} md={6} lg={6}></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <SentMessage message={message.text} receiver={message.senderId} student={this.state.student} />
                        </Grid>
                      </Grid>
                    </ListItem>
                  return (<ListItem>
                    <Grid container>
                      <Grid item xs={6} md={6} lg={6}>
                        <ReceivedMessage message={message.text} receiver={message.senderId} student={this.state.student} />
                      </Grid>
                      <Grid item xs={6} md={6} lg={6}></Grid>
                    </Grid>
                  </ListItem>)
                })}
            </Grid>
          </List>
          <Grid component={Paper} container spacing={0} sx={{ backgroundColor: "primary", marginBottom: 0, marginTop: 1, paddingBottom: 2, paddingTop: 2 }}>
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
              <TextField fullWidth color="secondary" variant="filled" focused sx={{ marginLeft: 2, marginRight: 2, backgroundColor: "#1b1b1bF" }} value={text} onChange={this.handleInput} />
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
              <IconButton style={{ backgroundColor: "#EBD99F", color: "#1b1b1b" }} type="submit" onClick={() => this.addMessage(this.state.id, text, this.state.chat.id)}><SendIcon /></IconButton>
            </Grid>
          </Grid>
        </Grid>

    return (
      <div>
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
                      {/* Connections List */}
                      <Typography variant="h4">Classmates</Typography>
                      <form >
                        <List>
                          {this.state.student.connectionsIds?.map((connection) => (
                            <ListItem >
                              <Typography>{connection}</Typography>
                              <IconButton type="submit" onClick={() => this.toChat(this.state.student.email, connection)}>
                                <ChatIcon
                                  fontSize="small"
                                  sx={{ color: "#EBD99F" }}
                                />
                              </IconButton>
                            </ListItem>
                          ))}
                        </List></form>
                    </Paper>
                  </Grid>


                  {/* Bottom Right Container and Paper - Chat View */}
                  {avatar}
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
