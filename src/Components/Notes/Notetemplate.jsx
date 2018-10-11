import { Card, ClickAwayListener, IconButton, Menu } from '@material-ui/core';
import React, { Component } from 'react';
import '../../assets/css/note.css';
import more from '../../assets/icons/more.svg';
import Addimage from './Addimage';
import Archivenote from './Archivenote';
import Collaborator from './Collaborator';
import Colournote from './Colournote';
import Deletenote from './Deletenote';
import Notedialog from './Notedialog';
import Pinnote from './Pinnote';
import Reminder from './Reminder';

class Notetemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isList: false,
      color: '#fff',
      moreMenu: false,
      anchorEl: null
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.note.title,
      description: this.props.note.description,
      color: this.props.note.color
    });
  }

  changeColor = (color) => {
    this.setState({
      color: color
    });
  }

  togglePin = () => {
    this.refs.pinnote.pinNote(this.props.note);
  }

  toggleArchive = () => {
    this.refs.archivenote.archiveNote();
  }

  toggleListView = () => {
    this.setState({
      isList: !this.state.isList
    })
    console.log('list');
  }

  updateTemplate = (newNote) => {
    this.setState({
      title: newNote.title,
      description: newNote.description
    })
  }

  updateColor = (color) => {
    this.setState({
      color: color
    })
  }

  noteDeleted = (note) => {
    // note can either be a note object or index from deletenote comp
    this.props.noteDeleted(note);
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

  openDialog = () => {
    this.refs.notedialog.openDialog();
  }

  closeDialog = () => {
    this.refs.notedialog.closeDialog();
  }

  render() {
    return (
      <div>
        <div onClick={this.changeState}>
          <Card style={{ backgroundColor: [this.state.color] }} className={this.state.isList ? 'Note-template-list' : 'Note-template'}>
            <div style={{ margin: '0px 10px' }}>
              <div style={{ float: 'right' }}>
                <Pinnote ref="pinnote" togglePin={this.togglePin} note={this.props.note} />
              </div>
              <p onClick={this.openDialog}>
                <strong>
                  {this.state.title}
                </strong>
              </p>
              <p onClick={this.openDialog} style={{ fontFamily: 'Roboto Slab' }}>
                {this.state.description}
              </p>
            </div>
            <div className={this.state.isList ? 'Note-template-footer-list' : 'Note-template-footer'}>
              <Reminder />
              <Collaborator />
              <Colournote changeColor={this.changeColor} note={this.props.note} />
              <Addimage />
              <Archivenote ref="archivenote" toggleArchive={this.toggleArchive} note={this.props.note} noteDeleted={this.noteDeleted} />
              <IconButton onClick={this.openMore}>
                <img src={more} alt="menu" />
              </IconButton>
              <Menu
                open={this.state.moreMenu}
                anchorEl={this.state.anchorEl}
                onClose={this.moreMenuClose}
              >
                <Deletenote note={this.props.note} noteDeleted={this.noteDeleted} index={this.props.index} />
              </Menu>
            </div>
          </Card>
        </div>
        <ClickAwayListener onClickAway={this.closeDialog}>
          <Notedialog ref="notedialog"
            updateColor={this.updateColor}
            updateTemplate={this.updateTemplate}
            note={this.props.note}
            color={this.state.color} />
        </ClickAwayListener>
      </div>
    );
  }
}

export default Notetemplate;
