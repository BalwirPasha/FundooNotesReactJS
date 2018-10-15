import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unauthorizedAccess: false,
      data : []
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
  
  toggleListView = () => {
    this.refs.dashboard.toggleListView();
  }

  changeTitle = (title) => {
    this.nav.changeTitle(title);
  }

  render() {
    if (this.state.unauthorizedAccess === true)
      return <Redirect to='/login' />
    return (
      <div>
        <Navbar innerRef={nav => this.nav = nav} toggleDrawer={this.toggle} toggleListView={this.toggleListView}></Navbar>
        <Sidebar ref="sidebar" changeTitle={this.changeTitle}></Sidebar>
        <Dashboard ref="dashboard" dash={this.props} notes={this.state.data}></Dashboard>
      </div>
    );
  }
}

export default Home;
