import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import archive from '../../assets/icons/archive.svg';
//import unarchive from '../../assets/icons/unarchive.svg';

class Archivenote extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  archiveNote = () => {
    
  }

  render() {
    return (
      <div>
          <IconButton onClick={this.archiveNote}>
              <img src={archive} alt="pin"/>
          </IconButton>
      </div>
    );
  }
}

export default Archivenote;
