import { IconButton, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import trash from '../../assets/icons/delete.svg';

class Deletenote extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  deleteNote = () => {
    console.log('delete note api');    
  }

  render() {
    return (
      <Tooltip title="Delete note">
        <div onClick={this.deleteNote} style={{ display: 'flex', flexDirection: 'row', marginRight: '10px', cursor:'pointer' }}>
          <IconButton>
            <img src={trash} alt="trash" />
          </IconButton>
          <p>Delete note</p>
        </div>
      </Tooltip>
    );
  }
}

export default Deletenote;
