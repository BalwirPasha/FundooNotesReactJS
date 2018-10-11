import { IconButton, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import trash from '../../assets/icons/delete.svg';
// import { deleteReq, headerUrl } from '../../services/HttpService';

class Deletenote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  deleteNote = () => {
    // const header = headerUrl();
    // deleteReq('http://localhost:8080/note/deletenote/'+this.props.note.noteId, header)
    //   .then(res => {
    //     this.props.noteDeleted(this.props.index);
    //   })
    //   .catch(err => {
    //     console.log(err.response);        
    //   });
    //this.props.noteDeleted();
  }

  render() {
    return (
      <Tooltip title="Delete note">
        <div onClick={this.deleteNote} style={{ display: 'flex', flexDirection: 'row', marginRight: '10px', cursor: 'pointer' }}>
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
