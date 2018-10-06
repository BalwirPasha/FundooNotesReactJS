import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
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
          <IconButton onClick={this.addImage}>
              <img src={image} alt="addimage"/>
          </IconButton>
      </div>
    );
  }
}

export default Addimage;
