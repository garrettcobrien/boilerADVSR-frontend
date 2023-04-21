import * as React from "react";
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
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  FormGroup,
} from "@mui/material";
import theme from "../theme";
import Navbar from "./Navbar";
import Copyright from "./Copyright";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

class SemesterTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      semester: this.props.semester,
      id: this.props.id,
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addCourse = this.addCourse.bind(this);
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

  addCourse(id, semester) {
    const year = this.state.semester.year;
    const season = this.state.semester.season;
    console.log(
      id +
        " " +
        semester.year +
        " " +
        semester.season +
        " " +
        semester.courseId +
        " " +
        semester.grade
    );
    StudentService.addCourseSem(
      id,
      semester.year,
      semester.season,
      semester.courseId,
      semester.grade
    ).then((res) => {});
    this.props.history.push(`/students/addsemester/${id}/${year}/${season}`);
  }

  render() {
    let sem = `${this.props.semester.season}`;
    if (sem == "SPRING") {
      return (
        <div>
          <Paper
            sx={{
              p: 1,
              flexDirection: "column",
              height: 170,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle",
              backgroundColor: "#EBD99F",
            }}
            backgroundColor
            elevation={8}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                verticalAlign: "middle",
                fontSize: 24,
              }}
              variant="h5"
              fontWeight={600}
              color="#1b1b1b"
            >
              {this.props.semester.season} {this.props.semester.year}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                verticalAlign: "middle",
                marginTop: 1,
                fontSize: 14,
              }}
              fontWeight={500}
              color="#2c2c2c"
            >
              {"GPA: "}
              {this.props.semester.gpa}
              {" | Credits: "}
              {this.props.semester.creditHours}
            </Typography>
            <Button
              style={{
                marginTop: 20,
                color: "#EBD99F",
                backgroundColor: "#2c2c2c",
              }}
              variant="contained"
              type="button"
              onClick={this.handleClickOpen}
            >
              <Typography fontWeight={600}>View</Typography>
            </Button>
            <Dialog
              onClose={this.handleClose}
              open={this.state.open}
              sx={{ p: 2 }}
            >
              <div>
                <Grid container marginLeft={2} marginTop={2} marginBottom={2}>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                    paddingLeft={1}
                  >
                    <Typography variant="h4" color="secondary" fontWeight={600}>
                      {this.props.semester.season} {this.props.semester.year}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                    paddingLeft={5}
                  >
                    <Typography>
                      Credits: {this.props.semester.creditHours}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                    paddingLeft={2}
                  >
                    <Typography>GPA: {this.props.semester.gpa}</Typography>
                  </Grid>
                </Grid>
                <Table fullWidth>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Number</TableCell>
                      <TableCell>Course Title</TableCell>
                      <TableCell>GPA</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.semester.courses?.map((course) => (
                      <TableRow>
                        <TableCell>
                          {course.courseIdDepartment} {course.courseIdNumber}
                        </TableCell>
                        <TableCell>{course.courseTitle}</TableCell>
                        <TableCell>{course.grade}</TableCell>
                        <TableCell>Remove</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Grid container spacing={3} sx={{ marginTop: 2 }}>
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
                  ></Grid>
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
                    <FormControl>
                      <TextField fullWidth color="secondary"></TextField>
                      <Button>Add</Button>
                    </FormControl>
                  </Grid>
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
                  ></Grid>
                </Grid>
              </div>
            </Dialog>
          </Paper>
        </div>
      );
    }
    // else {
    //   return (
    //     <div>
    //       <Paper
    //         sx={{
    //           p: 1,
    //           flexDirection: "column",
    //           height: 170,
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           textAlign: "center",
    //           verticalAlign: "middle",
    //           backgroundColor: "#1b1b1b",
    //         }}
    //         backgroundColor
    //         elevation={8}
    //       >
    //         <Typography
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             textAlign: "center",
    //             verticalAlign: "middle",
    //             fontSize: 24,
    //           }}
    //           variant="h5"
    //           fontWeight={600}
    //           color="secondary"
    //         >
    //           {this.props.semester.season}{" "}
    //           {this.props.semester.year}
    //         </Typography>
    //         <Typography
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             textAlign: "center",
    //             verticalAlign: "middle",
    //             marginTop: 1,
    //             fontSize: 14,
    //           }}
    //           fontWeight={500}
    //         >
    //           GPA: 4.00 | Credits: 17
    //         </Typography>
    //         <Button
    //           style={{
    //             marginTop: 20,
    //             backgroundColor: "#EBD99F",
    //             color: "#2c2c2c",
    //           }}
    //           variant="contained"
    //           type="button"
    //           onClick={this.handleClickOpen}
    //         >
    //           <Typography fontWeight={600}>View</Typography>
    //         </Button>
    //         <Dialog onClose={this.handleClose} open={this.state.open} sx={{p: 2}}>
    //           <div>
    //             <Grid container marginLeft={2} marginTop={2} marginBottom={2}>
    //               <Grid
    //                 item
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "left",
    //                   alignItems: "center",
    //                   textAlign: "left",
    //                   verticalAlign: "middle",
    //                 }}
    //                 paddingLeft={1}
    //               >
    //                 <Typography variant="h4" color="secondary" fontWeight={600}>
    //                   {this.props.semester.season}{" "}{this.props.semester.year}
    //                 </Typography>
    //               </Grid>
    //               <Grid
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "left",
    //                   alignItems: "center",
    //                   textAlign: "left",
    //                   verticalAlign: "middle",
    //                 }}
    //                 paddingLeft={5}
    //               >
    //                 <Typography>Credits: {this.props.semester.creditHours}</Typography>
    //               </Grid>
    //               <Grid
    //                 item
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "left",
    //                   alignItems: "center",
    //                   textAlign: "left",
    //                   verticalAlign: "middle",
    //                 }}
    //                 paddingLeft={2}
    //               >
    //                 <Typography>GPA: {this.props.semester.gpa}</Typography>
    //               </Grid>
    //             </Grid>
    //             <Table fullWidth>
    //               <TableHead>
    //                 <TableRow>
    //                   <TableCell>Course Number</TableCell>
    //                   <TableCell>Course Title</TableCell>
    //                   <TableCell>GPA</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //               </TableHead>
    //               <TableBody>
    //                 <TableRow>
    //                   <TableCell>CS18000</TableCell>
    //                   <TableCell>Object Oriented Programming</TableCell>
    //                   <TableCell>4.00</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //                 <TableRow>
    //                   <TableCell>CS24000</TableCell>
    //                   <TableCell>Programming in C</TableCell>
    //                   <TableCell>3.50</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //                 <TableRow>
    //                   <TableCell>CS25000</TableCell>
    //                   <TableCell>Computer Architecture</TableCell>
    //                   <TableCell>3.20</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //                 <TableRow>
    //                   <TableCell>CS18000</TableCell>
    //                   <TableCell>Object Oriented Programming</TableCell>
    //                   <TableCell>4.00</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //                 <TableRow>
    //                   <TableCell>CS24000</TableCell>
    //                   <TableCell>Programming in C</TableCell>
    //                   <TableCell>3.50</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //                 <TableRow>
    //                   <TableCell>CS25000</TableCell>
    //                   <TableCell>Computer Architecture</TableCell>
    //                   <TableCell>3.20</TableCell>
    //                   <TableCell>Remove</TableCell>
    //                 </TableRow>
    //               </TableBody>
    //             </Table>
    //           </div>
    //         </Dialog>
    //       </Paper>
    //     </div>
    //   );
    // }
  }
}
export default SemesterTile;
