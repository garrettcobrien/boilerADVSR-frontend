import React, {Component} from "react";
import './App.css';
import StudentEdit from './components/StudentEdit';
import StudentList from "./components/StudentList";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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