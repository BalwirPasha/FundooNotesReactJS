import { AppBar, IconButton, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import '../../assets/css/home.css';
import apps from '../../assets/icons/apps.svg';
import list from '../../assets/icons/list.svg';
import menu from '../../assets/icons/menu.svg';
import grid from '../../assets/icons/grid.svg';
import notifications from '../../assets/icons/notifications.svg';
import person from '../../assets/icons/person.svg';
import refresh from '../../assets/icons/refresh.svg';
import Searchbar from '../Notes/Searchbar';
import UserProfile from './UserProfile';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#fb0'
  },
  grow: {
    flexGrow: 1,
    color: '#000',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: false,
      title: 'Fundoo Notes'
    };
  }

  openProfile = event => {
    this.refs.profile.openProfile(event);
  };

  toggleListGrid = () => {
    this.setState({
      list: !this.state.list
    });
    this.props.toggleListView();
  }

  changeTitle = (title) => {
    this.setState({
      title: title
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.root}>
            <div className="Navbar">
              <Tooltip title="Main menu">
                <IconButton
                  className={classes.menuButton}
                  onClick={this.props.toggleDrawer}
                  color="inherit"
                  aria-label="Menu">
                  <img src={menu} alt="menu" />
                </IconButton>
              </Tooltip>
              <div className="Title-heading">
                <Typography variant="title">
                  {this.state.title}
                </Typography>
              </div>
              <div style={{ flexGrow: 50 }}>
                <Searchbar />
              </div>
              <div className="Navbar-icons Refresh-list">
                <div>
                  <Tooltip title="Refresh">
                    <IconButton
                      color="inherit"
                      aria-label="Refresh">
                      <img src={refresh} alt="refresh" />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title={this.state.list ? "Grid View" : "List View"}>
                    <IconButton
                      color="inherit"
                      onClick={this.toggleListGrid}
                      aria-label="List/Grid">
                      <img src={this.state.list ? grid : list} alt="list" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="Navbar-icons Profile-apps">
                <div>
                  <Tooltip title="Apps">
                    <IconButton
                      color="inherit"
                      aria-label="apps">
                      <img src={apps} alt="apps" />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Notifications">
                    <IconButton
                      color="inherit"
                      aria-label="notifications">
                      <img src={notifications} alt="notifications" />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Profile">
                    <IconButton
                      color="inherit"
                      aria-label="profile"
                      onClick={this.openProfile}>
                      <img src={person} alt="person" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <UserProfile ref="profile"></UserProfile>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
