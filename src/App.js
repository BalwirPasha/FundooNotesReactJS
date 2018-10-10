import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Miscellaneous/Home';
import Changepassword from './Components/User/Changepassword';
import Forgotpassword from './Components/User/Forgotpassword';
import Login from './Components/User/Login';
import Register from './Components/User/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />          
          <Route path='/forgotpassword' component={Forgotpassword} />
          <Route path='/changepassword/:token' component={Changepassword} />
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
