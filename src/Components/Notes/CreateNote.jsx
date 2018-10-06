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

class Createnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNote: false,
      color: '#fff',
      pin: false
    };
  }

  toggleCreateNote = () => {
    this.setState({
      createNote: !this.state.createNote
    })
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

  render() {
    if (!this.state.createNote)
      return <Takenote toggle={this.toggleCreateNote} />
    return (
      <div>
        <Card style={{ backgroundColor: [this.state.color] }} className="Create-note Margin-auto">
          <div>
            <div style={{ marginBottom: '10px' }}>
              <Input placeholder="Title" disableUnderline={true} style={{ width: '80%', margin: '10px' }}></Input>
              <div style={{ float: 'right', margin: '' }}>
                <Pinnote togglePin={this.togglePin} />
              </div>
              <Input placeholder="Take a note..." disableUnderline={true} style={{ width: '100%', margin: '0px 10px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="Create-note-icon-footer">
                <Reminder />
                <Collaborator />
                <Colournote changeColor={this.changeColor} />
                <Addimage />
                <Archivenote />
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

