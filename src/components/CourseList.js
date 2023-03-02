import React, { Component } from 'react';
import { Button, ButtonGroup, Container, InputGroupText, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {courses: []};

    }

    componentDidMount() {
        fetch('/courses?department=CS')
            .then(response => response.json())
            .then(data => this.setState({courses: data}));
    }


    
    render() {
        const {courses, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const coursesList = courses.map(course => {
            return <tr key={course.courseID}>
                <td style={{whiteSpace: 'nowrap'}}>{course.courseID}</td>
                <td>{course.courseTitle}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/courses/" + course.courseID}>View</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Courses</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Course</th>
                            <th width="30%">Title</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {coursesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default CourseList;