import { Button, Card, IconButton, Input, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import '../../assets/css/note.css';
import draw from '../../assets/icons/draw.svg';
import image from '../../assets/icons/image.svg';
import more from '../../assets/icons/more.svg';
import NewList from '../../assets/icons/newlist.svg';
import Addimage from './Addimage';
import Archivenote from './Archivenote';
import Collaborator from './Collaborator';
import Colournote from './Colournote';
import Pinnote from './Pinnote';
import Reminder from './Reminder';
import { postData, headerJsonWithToken } from '../../services/HttpService';

class Createnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNote: false,
      title: '',
      description: '',
      color: '#fff',
      pin: false,
      archive: false
    };
  }

  toggleCreateNote = () => {
    this.setState({
      createNote: !this.state.createNote
    });
    if (this.state.title !== '' || this.state.description !== '') {
      console.log('create note api');
      const note = {
        title: this.state.title,
        description: this.state.description,
        color: this.state.color,
        pin: this.state.pin,
        archive: this.state.archive
      }
      const header = headerJsonWithToken();
      postData('http://localhost:8080/note/createnote', note, header)
        .then(res => {
          console.log(res.data);
          this.props.noteCreated(res.data);
        })
        .catch(err => {
          console.log(err.response);
        })
    }
    this.resetState();
  }

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      color: '#fff',
      pin: false,
      archive: false
    });
  }

  changeColor = (color) => {
    this.setState({
      color: color
    });
  }

  togglePin = () => {
    this.setState({
      pin: !this.state.pin
    })
  }

  toggleArchive = () => {
    this.setState({
      archive: !this.state.archive
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (!this.state.createNote)
      return <Takenote toggle={this.toggleCreateNote} />
    return (
      <div>
        <Card style={{ backgroundColor: [this.state.color] }} className="Create-note Margin-auto">
          <div>
            <div style={{ marginBottom: '10px' }}>
              <Input name='title' placeholder="Title" onChange={this.handleInput} multiline={true}
                disableUnderline={true} style={{ width: '89%', margin: '10px' }}></Input>
              <div style={{ float: 'right', margin: '' }}>
                <Pinnote togglePin={this.togglePin} />
              </div>
              <Input name='description' placeholder="Take a note..." onChange={this.handleInput}
                multiline={true} disableUnderline={true} style={{ width: '100%', margin: '0px 10px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="Create-note-icon-footer">
                <Reminder />
                <Collaborator />
                <Colournote changeCreateNoteColor={this.changeColor} />
                <Addimage />
                <Archivenote toggleArchive={this.toggleArchive} />
                <IconButton>
                  <img src={more} alt="menu" />
                </IconButton>
              </div>
              <div>
                <Button style={{ textTransform: 'capitalize', marginRight: '10px' }} onClick={this.toggleCreateNote}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Createnote;

class Takenote extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Card className="Take-note Margin-auto" onClick={this.props.toggle}>
        <div>
          <Typography variant="body1" style={{ padding: '12px 10px' }}>
            Take a note...
          </Typography>
        </div>
        <div>
          <IconButton>
            <img src={NewList} alt="list" />
          </IconButton>
          <IconButton>
            <img src={image} alt="list" />
          </IconButton>
          <IconButton disabled={true}>
            <img src={draw} alt="list" />
          </IconButton>
        </div>
      </Card>
    );
  }
}

