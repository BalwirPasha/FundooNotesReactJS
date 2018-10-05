import React, { Component } from 'react';
import Createnote from '../Notes/CreateNote';
import Notetemplate from '../Notes/Notetemplate';

class TestDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true
    };
  }

  toggleCss = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  render() {
    return (
      <div className={this.state.isSidebarOpen ? "Dash-with-side" : "Dash-wo-side"}>
        <Createnote />
        <div>
          <h2>This is test attempt to check dashboard's response w.r.t sidebar toggle.</h2>
          <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro debitis distinctio ea, ratione, recusandae laudantium sunt odio culpa dolore aut quod, quis hic molestias voluptate quaerat explicabo eaque eveniet! Qui?</h2>
        </div>
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
          <Notetemplate />
          <Notetemplate />
          <Notetemplate />
          <Notetemplate />
          <Notetemplate />
          <Notetemplate />
          <Notetemplate />
          <Notetemplate />
        </div>
      </div>
    );
  }
}

export default TestDashboard;
