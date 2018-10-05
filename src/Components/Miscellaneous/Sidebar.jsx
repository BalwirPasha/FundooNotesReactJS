import { Drawer, createMuiTheme, MuiThemeProvider, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import React, { Component } from 'react';
import notes from '../../assets/icons/note.svg';
import label from '../../assets/icons/label.svg';
import archive from '../../assets/icons/archive.svg';
import trash from '../../assets/icons/delete.svg';
import reminder from '../../assets/icons/reminder.svg';

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 64,
        height: 'calc(100% - 64px)',
        backgroundColor: 'rgb(236, 236, 236)',
        width: '280px',
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
    for(let i=0; i<5; i++){
      testLabels.push(<ListItem button>
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
                <ListItem button>
                  <ListItemIcon>
                    <img src={notes} alt="notes" />
                  </ListItemIcon>
                  <ListItemText>Notes</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <img src={reminder} alt="reminder" />
                  </ListItemIcon>
                  <ListItemText>Reminders</ListItemText>
                </ListItem>
              </List>
              <Divider></Divider>
              <List>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ marginTop: '8px', marginLeft: '15px' }}>
                    Labels
                  </div>
                  <Button size="small" style={{ marginRight: '20px' }}>
                    Edit
                  </Button>
                </div>
                {testLabels}
              </List>
              <Divider></Divider>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <img src={archive} alt="archive" />
                  </ListItemIcon>
                  <ListItemText>Archive</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <img src={trash} alt="trash" />
                  </ListItemIcon>
                  <ListItemText>Trash</ListItemText>
                </ListItem>
              </List>
            </Drawer>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Sidebar;
