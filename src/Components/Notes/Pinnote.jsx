import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
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

  pinNote = () => {
    console.log('pin note api');
  }

  componentDidMount() {
    if (this.props.note !== undefined && this.props.note.pinned) {
      this.setState({
        isPinned: this.props.note.pinned
      })
    }
  }

  render() {
    return (
      <div>
        <Tooltip title={this.state.isPinned ? 'Unpin' : 'Pin'}>
          <IconButton onClick={this.togglePin}>
            <img src={this.state.isPinned ? unpin : pin} alt="pin" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Pinnote;
