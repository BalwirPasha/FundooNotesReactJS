import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import pin from '../../assets/icons/pin.svg';
import unpin from '../../assets/icons/unpin.svg';

class Pinnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPinned: false
    };
  }

  togglePin = () => {
    this.setState({
      isPinned: !this.state.isPinned
    });
    this.props.togglePin();
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.togglePin}>
          <img src={this.state.isPinned ? unpin : pin} alt="pin" />
        </IconButton>
      </div>
    );
  }
}

export default Pinnote;
