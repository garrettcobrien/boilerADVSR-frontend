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
        this.setEvents = this.setEvents.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then((res) => {
            this.setState({student: res.data});
        })
        APIService.getAllEvents().then((res) => {
            this.setState({eventFormattedList: this.setEvents(res.data)});
        })
    }

    toProfile() {
        this.props.history.push(`/students/dashboard/${this.state.id}`);
      }

    setEvents(events) {
        const eventFormattedList = [{title: String, date: String}];
        for (let index = 0; index < eventFormattedList.length; index++) {
            //console.log(events[index].year + '-' + events[index].month + '-' + events[index].day)
            let title2 = events[index].title;
            let date2 = events[index].year + '-' + events[index].month + '-' + events[index].day;
            eventFormattedList[index] = {title : title2, date : date2};
            eventsList.push({title : title2, date : date2});
            };
        console.log(eventFormattedList);
        return eventFormattedList;
    }

    render() {
        const { id, student, eventFormattedList, events } = this.state;
        eventsList.push({title: 'Today', date: '2023-04-13'}); 
        console.log(eventsList);
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
                    events={eventsList}
                />
            </div>  
        ) 
    }  
}  
  
export default Calendar 