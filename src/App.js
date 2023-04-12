import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SearchCourses from "./components/SearchCourses";
import LandingPage from "./components/LandingPage";
import PlanOfSudy from "./components/PlanOfStudy";
import EditProfile from "./components/EditProfile";
import ResetPasswordEnterEmail from "./components/ResetPasswordEnterEmail";
import CourseView from "./components/CourseView";
import Search from "./components/Search";
import SugggestSemester from "./components/SuggestSemester"
import Chat from "./components/Chat";

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route  path='/students/change/pass=:id' component={ResetPasswordEnterEmail} />
            <Route  path='/students/new' component={Register} />
            <Route  path='/students/landingpage/:id' component={LandingPage} />
            <Route  path='/students/dashboard/:id' component={Dashboard} />
            <Route  path='/students/courses/:id' component={SearchCourses} />
            <Route  path='/students/editprofile/:id' component={EditProfile} />
            <Route  path='/students/planofstudy/:id' component={PlanOfSudy} />
            <Route  path='/students/suggest/:id' component={SugggestSemester} />
            <Route  path='/course/:id/:courseID' component={CourseView} />
            <Route path='/students/chat/:id/:connectionID' component={Chat} />
          </Switch>
        </Router>
        </div>
    );
  }
}
export default App;
