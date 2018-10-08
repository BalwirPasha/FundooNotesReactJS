import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import archive from '../../assets/icons/archive.svg';
import unarchive from '../../assets/icons/unarchive.svg';

class Archivenote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: false
    };
  }

  componentDidMount(){
    if(this.props.note !== undefined && this.props.note.archived){
      this.setState({
        archive: this.props.note.archived
      });
    }
  }

  toggleArchive = () => {
    this.setState({
      archive: !this.state.archive
    });
    this.props.toggleArchive();
  }

  archiveNote = () => {
    console.log('archive api');
  }

  render() {
    return (
      <div>
        <Tooltip title={this.state.archive ? 'Unarchive' : 'Archive'}>
          <IconButton onClick={this.toggleArchive}>
            <img src={this.state.archive ? archive : unarchive} alt="pin" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Archivenote;
