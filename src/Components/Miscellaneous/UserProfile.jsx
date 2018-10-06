import { createMuiTheme, Menu, MuiThemeProvider, Divider, Button, Typography, Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import '../../assets/css/home.css'
import troll from '../../assets/image/deathstroke.png';
import { Redirect } from 'react-router-dom';

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        marginTop: '50px',
        backgroundColor: 'rgb(238, 238, 238)'
      }
    },
    MuiButton: {
      label: {
        textTransform: 'capitalize'
      }
    },
    MuiAvatar: {

    }
  }
})

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      logout: false
    };
  }

  openProfile = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onProfileClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.setState({
      logout: true
    });
    localStorage.clear();
  }

  render() {
    if (this.state.logout === true)
      return <Redirect to="/login" push={true}></Redirect>
    const { anchorEl } = this.state;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.onProfileClose}
          >
            <div>
              <div className="Profile-menu">
                <div>
                  <Avatar style={{ height: '95px', width: '95px', border: '1px solid black' }} src={troll} alt="troll" />
                  {
                    /*<img src='data:image/png;base64,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' alt="troll"/>*/
                  }
                </div>
                <div>
                  <Typography variant="body2">
                    Swapnil Bhagat
              </Typography>
                  <Typography variant="caption">
                    bhagatswapnil0004@gmail.com
              </Typography>
                </div>
              </div>
            </div>
            <Divider></Divider>
            <div className="Profile-menu-footer">
              <Button variant='outlined'>Add Account</Button>
              <Button variant='outlined' onClick={this.logout}>Sign Out</Button>
            </div>
          </Menu>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default UserProfile;
