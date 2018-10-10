import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
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
        <Tooltip title="Remind me">
          <IconButton onClick={this.addReminder}>
              <img src={reminder} alt="pin"/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Reminder;
