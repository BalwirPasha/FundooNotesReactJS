import { Card, createMuiTheme, IconButton, Menu, MuiThemeProvider, ClickAwayListener } from '@material-ui/core';
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

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        marginTop: '50px'
      }
    }
  }
});

class Notetemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isList: false,
      color: '#fff',
      moreMenu: false,
      anchorEl: null,
      stateTest : 614316,
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
      description: newNote.description,
      color: newNote.color
    })
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

  changeState = () => {
    console.log('state');    
    this.setState({
      stateTest: Math.random()
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div onClick={this.changeState}>
          <Card style={{ backgroundColor: [this.state.color] }} className={this.state.isList ? 'Note-template-list' : 'Note-template'}>
            <div style={{ margin: '0px 10px' }} onClick={this.openDialog}>
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
              <Reminder stateTest={this.state.stateTest} />
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
          </Card>
        </div>
        <ClickAwayListener onClickAway={this.closeDialog}>
          <Notedialog ref="notedialog" updateTemplate={this.updateTemplate} note={this.props.note} />
        </ClickAwayListener>
      </MuiThemeProvider>
    );
  }
}

export default Notetemplate;
