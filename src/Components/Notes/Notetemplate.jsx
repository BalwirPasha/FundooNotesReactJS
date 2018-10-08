import { Card, IconButton, Menu, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import '../../assets/css/note.css';
import more from '../../assets/icons/more.svg';
import Addimage from './Addimage';
import Archivenote from './Archivenote';
import Collaborator from './Collaborator';
import Colournote from './Colournote';
import Pinnote from './Pinnote';
import Reminder from './Reminder';
import Deletenote from './Deletenote';
import Notedialog from './Notedialog';

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
      openDialog: false,
      moreMenu: false,
      anchorEl: null
    };
  }

  componentDidMount() {
    this.setState({
      color: this.props.note.color
    });
  }

  changeColor = (color) => {
    this.setState({
      color: color
    })
    this.refs.colornote.changeColor(color);
  }

  togglePin = () => {
    this.refs.pinnote.pinNote();
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
    this.setState({
      openDialog: true
    })
  }

  onDialogClose = () => {
    this.setState({
      openDialog: false
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Card onClick={this.openDialog} style={{ backgroundColor: [this.state.color] }} className={this.state.isList ? 'Note-template-list' : 'Note-template'}>
            <div style={{ margin: '0px 10px' }}>
              <div style={{ float: 'right' }}>
                <Pinnote ref="pinnote" togglePin={this.togglePin} note={this.props.note} />
              </div>
              <p>
                <strong>
                  {this.props.note.title}
                </strong>
              </p>
              <p style={{ fontFamily: 'Roboto Slab' }}>
                {this.props.note.description}
              </p>
            </div>
            <div className={this.state.isList ? 'Note-template-footer-list' : 'Note-template-footer'}>
              <Reminder />
              <Collaborator />
              <Colournote ref="colornote" changeColor={this.changeColor} note={this.props.note} />
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
          <Notedialog open={this.state.openDialog} onClose={this.onDialogClose}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Notetemplate;
