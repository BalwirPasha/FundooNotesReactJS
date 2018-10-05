import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Forgotpassword from './Components/User/Forgotpassword';
import Changepassword from './Components/User/Changepassword';
import Home from './Components/Miscellaneous/Home';

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
          <Route path='/home' component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
