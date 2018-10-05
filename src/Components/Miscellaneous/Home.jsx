import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import TestDashboard from './TestDashboard';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unauthorizedAccess: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem('fundooUser') === null || localStorage.getItem('fundooUser') === undefined) {
      this.setState({
        unauthorizedAccess: true
      });
    }
  }

  toggle = () => {
    this.refs.sidebar.toggleDrawer();
    this.refs.dashboard.toggleCss();
  }

  render() {
    if (this.state.unauthorizedAccess === true)
      return <Redirect to='/login' />
    return (
      <div>
        <Navbar toggleDrawer={this.toggle}></Navbar>
        <Sidebar ref="sidebar"></Sidebar>
        <TestDashboard ref="dashboard"></TestDashboard>
      </div>
    );
  }
}

export default Home;
