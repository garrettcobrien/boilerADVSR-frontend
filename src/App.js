import React, {Component} from "react";
import CourseList from "./components/CourseList";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./components/Register";
import Dashbaord from "./components/Dashboard";
import Login from "./components/Login";
import SearchCourses from "./components/SearchCourses";
import LandingPage from "./components/LandingPage";
import { dividerClasses } from "@mui/material";
import style from './style.css'

class App extends Component {

  render() {
    return (
      <div style={{backgroundColor: '#1E1E1E'}}>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/students/new' component={Register} />
            <Route path='/students/landingpage/:id' component={LandingPage} />
            <Route path='/students/dashboard/:id' component={Dashbaord} />
            <Route path='/students/courses/:id' component={SearchCourses} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
