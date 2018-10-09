import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import archive from '../../assets/icons/archive.svg';
import unarchive from '../../assets/icons/unarchive.svg';
import { putParam, headerUrl } from '../../services/HttpService';

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
    this.props.toggleArchive();
  }

  archiveNote = () => {
    console.log('archive api');
    const param = { noteId : this.props.note.noteId}
    putParam('http://localhost:8080/note/archivenote', param, headerUrl)
      .then(res => {
        this.setState({
          archive: !this.state.archive
        });
      })
      .catch(err => {
        console.log(err.response);        
      })
  }

  render() {
    return (
      <div>
        <Tooltip title={this.state.archive ? 'Unarchive' : 'Archive'}>
          <IconButton onClick={this.toggleArchive}>
            <img src={this.state.archive ? unarchive : archive} alt="pin" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Archivenote;
