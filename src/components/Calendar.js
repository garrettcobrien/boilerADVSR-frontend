import React, { Component } from 'react'  
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  
import StudentService from '../services/StudentService';
import { Button } from 'reactstrap';
import APIService from '../services/APIService';

let eventsList = [{ title: 'Today', date: '2023-04-09' }];  
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
            this.setState({student: res.data});
        })
        APIService.getAllEvents().then((res) => {
            this.setState({eventFormattedList: res.data});

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
            <div className="container">
                <Button onClick={this.toProfile}>Back to profile</Button>  
                <div className="row title" style={{ marginTop: "20px" }} >  
                    <div class="col-sm-12 btn btn-info">  
                        FullCalendar In React Application  
               </div>  
                </div>  
                <FullCalendar  
                    defaultView="dayGridMonth"  
                    plugins={[dayGridPlugin]}
                    events={eventFormattedList}
                />
            </div>  
        ) 
    }  
}  
  
export default Calendar 