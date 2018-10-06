import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import trash from '../../assets/icons/trash.svg';

class Deletenote extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  deleteNote = () => {
    
  }

  render() {
    return (
      <div>
          <IconButton onClick={this.deleteNote}>
              <img src={trash} alt="trash"/>
          </IconButton>
      </div>
    );
  }
}

export default Deletenote;
