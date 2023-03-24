import React, {Component} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./components/Register";
import Dashbaord from "./components/Dashboard";
import Login from "./components/Login";
import SearchCourses from "./components/SearchCourses";
import LandingPage from "./components/LandingPage";

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/students/new' component={Register} />
            <Route path='/students/landingpage/:id' component={LandingPage} />
            <Route path='/students/dashboard/:id' component={Dashbaord} />
            <Route path='/students/courses/:id' component={SearchCourses} />
          </Switch>
        </Router>
    );
  }
}
export default App;
