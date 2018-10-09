import React, { Component } from 'react';
import { Dialog, Input, IconButton, Button, Menu } from '@material-ui/core';
import Addimage from './Addimage';
import Archivenote from './Archivenote';
import Collaborator from './Collaborator';
import Colournote from './Colournote';
import Pinnote from './Pinnote';
import Reminder from './Reminder';
import Deletenote from './Deletenote';
import { putData, headerJsonWithToken } from '../../services/HttpService';
import more from '../../assets/icons/more.svg';
import '../../assets/css/note.css';

class Notedialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
      color: '',
      anchorEl: null,
      moreMenu: false
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.note.title,
      description: this.props.note.description,
      color: this.props.note.color
    });
  }

  openDialog = () => {
    this.setState({
      open: true
    });
  }

  closeDialog = () => {
    this.setState({
      open: false
    });
    const data = {
      noteId: this.props.note.noteId,
      title: this.state.title,
      description: this.state.description,
      color: this.state.color
    }
    if (this.state.title !== this.props.note.title ||
      this.state.description !== this.props.note.description) {
      putData('http://localhost:8080/note/updatenote', data, headerJsonWithToken)
        .then(res => {
          this.props.updateTemplate(data);
        })
        .catch(err => {
          console.log(err.response);
        })
    } else if (this.state.color !== this.props.note.color) {
      this.props.updateTemplate(data);
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  togglePin = () => {
    this.refs.pinnote.pinNote(this.props.note);
  }

  changeColor = (color) => {
    this.setState({
      color: color
    });
  }

  toggleArchive = () => {
    this.refs.archivenote.archiveNote();
  }

  openMore = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      moreMenu: true
    })
  }

  moreMenuClose = () => {
    this.setState({
      anchorEl: null,
      moreMenu: false
    })
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.closeDialog}>
        <div style={{ backgroundColor: [this.state.color], width: '600px' }}>
          <div style={{ margin: '10px' }}>
            <Input disableUnderline={true}
              multiline={true}
              name='title'
              onChange={this.handleInput}
              value={this.state.title}
              style={{ width: '85%' }}>
            </Input>
            <div style={{ float: 'right' }}>
              <Pinnote ref="pinnote" togglePin={this.togglePin} note={this.props.note} />
            </div>
            <Input disableUnderline={true}
              multiline={true}
              name='description'
              onChange={this.handleInput}
              value={this.state.description}
              style={{ width: '100%' }}>
            </Input>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="Create-note-icon-footer">
              <Reminder />
              <Collaborator />
              <Colournote changeColor={this.changeColor} note={this.props.note} />
              <Addimage />
              <Archivenote ref="archivenote" toggleArchive={this.toggleArchive} note={this.props.note} />
              <IconButton onClick={this.openMore}>
                <img src={more} alt="menu" />
              </IconButton>
              <Menu
                open={this.state.moreMenu}
                anchorEl={this.state.anchorEl}
                onClose={this.moreMenuClose}
                className="Note-template-menu">
                <Deletenote />
              </Menu>
            </div>
            <div>
              <Button style={{ textTransform: 'capitalize', marginRight: '10px' }} onClick={this.closeDialog}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default Notedialog;
