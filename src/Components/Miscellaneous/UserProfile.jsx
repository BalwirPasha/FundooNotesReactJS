import { Avatar, Button, createMuiTheme, Divider, Menu, MuiThemeProvider, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../assets/css/home.css';
import { headerJsonWithToken, putData } from '../../services/HttpService';

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
      logout: false,
      randomToggle: false
    };
    this.fundooUser = JSON.parse(localStorage.getItem('fundooUser'));
  }

  openProfile = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onProfileClose = () => {
    this.setState({ anchorEl: null });
  };

  fileUpload = (event) => {
    let profilePicture = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(profilePicture);
    reader.onload = () => {
      const picture = (reader.result).toString().split(',')[1]; //added toString()
      const body = {
        'profilePicture': picture,
        'emailId': this.fundooUser.email,
        'imageName': profilePicture.name
      }
      const header = headerJsonWithToken();
      putData('http://localhost:8080/user/profilepicture', body, header)
        .then(res => {
          this.fundooUser.profile = picture;
          localStorage.setItem('fundooUser', JSON.stringify(this.fundooUser));
          this.setState({
            randomToggle: !this.state.randomToggle
          })
        })
        .catch(err => {
          console.log(err.response);
        })
    }
  }

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
                  <label htmlFor="profile">
                    <Avatar style={{ height: '95px', width: '95px', border: '1px solid black' }} src={'data:image/png;base64,' + JSON.parse(localStorage.getItem('fundooUser')).profile} alt="troll" />
                  </label>
                  <input type="file" id="profile" onChange={this.fileUpload} style={{ display: 'none' }} />
                  {
                    /*<img src='data:image/png;base64,' alt="troll"/>*/
                  }
                </div>
                <div>
                  <Typography variant="body2">
                    {this.fundooUser.firstName+ " " + this.fundooUser.lastName}
                  </Typography>
                  <Typography variant="caption">
                    {this.fundooUser.email}
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
