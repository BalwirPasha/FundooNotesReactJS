import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import pin from '../../assets/icons/pin.svg';
import unpin from '../../assets/icons/unpin.svg';
import { putParam, headerUrl } from '../../services/HttpService';

class Pinnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPinned: false
    };
  }

  togglePin = () => {
    this.props.togglePin();
    this.setState({
      isPinned: !this.state.isPinned
    });
  }

  pinNote = (note) => {
    const param = { noteId : note.noteId};
    const header = headerUrl();
    putParam('http://localhost:8080/note/pinnote', param, header)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        this.setState({
          isPinned: !this.state.isPinned
        });
        console.log(err.response);        
      })
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
