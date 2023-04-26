import React, { Component } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import StudentService from '../services/StudentService';
import Navbar from './Navbar';
import APIService from '../services/APIService';
import { Box, Container, Button, CssBaseline, ThemeProvider } from '@mui/material';
import theme from "../theme";
import styled from "@emotion/styled";



const StyleWrapper = styled.div`
  .fc {
    color: #EBD99F;
}
   .fc-button {
     color: #EBD99F;
     background: #626366;
}
   .fc-button-primary:disabled {
      color: #EBD99F;
      background: #626366;
   }
   .fc-col-header-cell-cushion {
      color: #EBD99F;
  }
  .fc-daygrid-day-number {
    color: #EBD99F;
  }
`

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            student: {},
            events: [],
            eventFormattedList: [],
        }

        this.toProfile = this.toProfile.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then((res) => {
            this.setState({ student: res.data });
        })
        APIService.getAllEvents().then((res) => {
            this.setState({ eventFormattedList: res.data });

        })
    }

    toProfile() {
        this.props.history.push(`/students/dashboard/${this.state.id}`);
    }

    render() {
        const { id, eventFormattedList, student, events } = this.state;
        //eventsList.push({title: 'Today', date: '2023-04-13'}); 
        console.log(eventFormattedList);
        return (
            <div >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box sx={{ display: "flex" }}>
                        <Navbar id={this.state.id} />

                        <Box
                            component="main"
                            sx={{
                                marginTop: "60px",
                                flexGrow: 1,
                                height: "100vh",
                                overflow: "auto",
                            }}
                        >

                            <Container
                                sx={{ mt: 8, mb: 8 }}
                            >
                                <StyleWrapper >
                                <FullCalendar
                                    defaultView="dayGridMonth"
                                    plugins={[dayGridPlugin]}
                                    events={eventFormattedList}
                                    eventTextColor='#EBD99F'
                                    eventColor="#626366"
                                />
                                </StyleWrapper>
                            </Container>
                        </Box>
                    </Box>
                </ThemeProvider>
            </div >
        )
    }
}

export default Calendar 