import { Button, createMuiTheme, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import archive from '../../assets/icons/archive.svg';
import trash from '../../assets/icons/delete.svg';
import label from '../../assets/icons/label.svg';
import notes from '../../assets/icons/note.svg';
import reminder from '../../assets/icons/reminder.svg';
import { Link } from 'react-router-dom'

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 64,
        height: 'calc(100% - 64px)',
        backgroundColor: 'rgb(236, 236, 236)',
        width: '280px',
      }
    },
    MuiButton: {
      label: {
        textTransform: 'capitalize',
      },
      text: {
      }
    }
  }
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: true
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      left: !this.state.left
    });
  };

  render() {
    const testLabels = [];
    for (let i = 0; i < 5; i++) {
      testLabels.push(<ListItem key={i} button>
        <ListItemIcon>
          <img src={label} alt="label" />
        </ListItemIcon>
        <ListItemText>Label</ListItemText>
      </ListItem>);
    }
    return (
      <div>
        <div>
          <MuiThemeProvider theme={theme}>
            <Drawer
              variant='persistent'
              open={this.state.left}
            >
              <List>
                <Link to="/home">
                  <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                    <img src={notes} alt="notes" style={{ marginRight: '30px' }} />
                    <span>Notes</span>
                  </Button>
                </Link>
                <Button href="agasdgda" style={{ width: '100%', height: '50px' }}>
                  <ListItemIcon>
                    <img src={reminder} alt="reminder" />
                  </ListItemIcon>
                  <ListItemText style={{ fontSize: '12px' }}>Reminders</ListItemText>
                </Button>
              </List>
              <Divider></Divider>
              <List>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ marginTop: '8px', marginLeft: '15px' }}>
                    Labels
                  </div>
                  <Button href="/home/asfasg" size="small" style={{ marginRight: '20px' }}>
                    Edit
                  </Button>
                </div>
                {testLabels}
              </List>
              <Divider></Divider>
              <List>
                <Link to='/home/archive'>
                  <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                    <img src={archive} alt="archive" style={{ marginRight: '30px' }} />
                    <span>Archive</span>
                  </Button>
                </Link>
                <Link to='/home/trash'>
                  <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                    <img src={trash} alt="trash" style={{ marginRight: '30px' }} />
                    <span>Trash</span>
                  </Button>
                </Link>
              </List>
            </Drawer>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Sidebar;
