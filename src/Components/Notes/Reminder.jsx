import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import reminder from '../../assets/icons/reminder.svg';

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addReminder = () => {
    
  }

  render() {
    return (
      <div>
          <IconButton onClick={this.addReminder}>
              <img src={reminder} alt="pin"/>
          </IconButton>
      </div>
    );
  }
}

export default Reminder;
