import { IconButton, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import image from '../../assets/icons/image.svg';

class Addimage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addImage = () => {
    
  }

  render() {
    return (
      <div>
        <Tooltip title="Add image">          
          <IconButton onClick={this.addImage}>
              <img src={image} alt="addimage"/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Addimage;
