import React, {Component} from "react";
import './App.css';
import StudentEdit from './StudentEdit';
import StudentList from "./StudentList";
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from "./AppNavbar";

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/students' exact={true} component={StudentList}/>
            <Route path='/students/:id' component={StudentEdit}/>
          </Switch>
        </Router>
    );
  }
}
export default App;