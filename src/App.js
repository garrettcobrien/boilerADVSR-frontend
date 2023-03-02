import React, {Component} from "react";
import './App.css';
import StudentEdit from './components/StudentEdit';
import StudentList from "./components/StudentList";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./components/Register";
import Dashbaord from "./components/Dashboard";
import Login from "./components/Login";

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            {/* <Route path='/' exact={true} component={Home}/> */}
            {/* <Route path='/students' exact={true} component={StudentList}/> */}
            {/* <Route path='/students/:id' component={StudentEdit}/> */}
            <Route path='/students/new' exact={true} component={Register} />
            <Route path='/' exact={true} component={Login} />
            <Route path='/students/dashboard/:id' component={Dashbaord} />

          </Switch>
        </Router>
    );
  }
}
export default App;