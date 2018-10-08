import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import collaborator from '../../assets/icons/collaborator.svg';

class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addCollaborator = () => {

  }

  render() {
    return (
      <div>
        <Tooltip title="Collaborator">
          <IconButton onClick={this.addCollaborator}>
            <img src={collaborator} alt="collaborator" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Collaborator;
