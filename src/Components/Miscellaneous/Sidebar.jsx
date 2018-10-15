import { Button, createMuiTheme, Divider, Drawer, List, ListItemIcon, ListItemText, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import archive from '../../assets/icons/archive.svg';
import trash from '../../assets/icons/delete.svg';
import label from '../../assets/icons/label.svg';
import notes from '../../assets/icons/note.svg';
import reminder from '../../assets/icons/reminder.svg';
import { get, headerUrl } from '../../services/HttpService';
import EditLabelDialog from '../Notes/EditLabelDialog';

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
        textTransform: 'none',
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
      left: true,
      labels: []
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount = () => {
    this.getAllLabels();
    console.log('did');
  }

  getAllLabels = () => {
    const header = headerUrl();
    get('http://localhost:8080/note/label/getalllabels', header)
      .then(res => {
        console.log(res.data);
        this.setState({
          labels: res.data,
          labelsView: res.data.map((labl) => {
            return <Link to={`/home/label/${labl.labelName}`} onClick={() => this.changeTitle(labl.labelName)} key={labl.labelId}>
              <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                <img src={label} alt="label" style={{ marginRight: '30px' }} />
                <span>{labl.labelName}</span>
              </Button>
            </Link>
          })
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  toggleDrawer() {
    this.setState({
      left: !this.state.left
    });
  };

  changeTitle = (title) => {
    this.props.changeTitle(title);
  }

  labelCreated = (newLabel) => {
    let labels = this.state.labels;
    labels.push(newLabel);
    let labelsView = this.state.labelsView;
    labelsView.push(<Link to={`/home/label/${newLabel.labelName}`} onClick={() => this.changeTitle(newLabel.labelName)} key={newLabel.labelId}>
      <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
        <img src={label} alt="label" style={{ marginRight: '30px' }} />
        <span>{newLabel.labelName}</span>
      </Button>
    </Link>);
    console.log(labels);
    console.log(labelsView);
    this.setState({
      labels: labels,
      labelsView: labelsView
    })
  }

  labelDeleted = (delLabel) => {
    this.setState({
      labels: this.state.labels.filter(label => (delLabel.labelId !== label.labelId)),
      labelsView: this.state.labelsView.filter(labelView => (delLabel.labelId !== parseInt(labelView.key, 10)))
    })
  }

  labelUpdated = (updatedLabel) => {
    let labelsView = this.state.labelsView;
    labelsView.forEach((labelView, index) => {
      if (parseInt(labelView.key, 10) === updatedLabel.labelId) {
        labelsView.splice(index, 1, (<Link to={`/home/label/${updatedLabel.labelName}`} onClick={() => this.changeTitle(updatedLabel.labelName)} key={updatedLabel.labelId}>
          <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
            <img src={label} alt="label" style={{ marginRight: '30px' }} />
            <span>{updatedLabel.labelName}</span>
          </Button>
        </Link>))
      }
    })
    let labels = this.state.labels;
    labels.forEach((label, index) => {
      if (label.labelId === updatedLabel.labelId) {
        labels.splice(index, 1, updatedLabel)
      }
    })
    this.setState({
      labels: labels,
      labelsView: labelsView
    })
  }

  render() {
    return (
      <div>
        <div>
          <MuiThemeProvider theme={theme}>
            <Drawer
              variant='persistent'
              open={this.state.left}
            >
              <List>
                <Link to="/home" onClick={() => this.changeTitle('Fundoo Notes')}>
                  <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                    <img src={notes} alt="notes" style={{ marginRight: '30px' }} />
                    <span>Notes</span>
                  </Button>
                </Link>
                {/* href will re-mount all components hence to be used with caution */}
                <Button href="/home/agasdgda" style={{ width: '100%', height: '50px' }}>
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
                  <Button onClick={() => this.labeldialog.openLabelDialog()} size="small" style={{ marginRight: '20px' }}>
                    Edit
                  </Button>
                </div>
                {this.state.labelsView}
              </List>
              <Divider></Divider>
              <List>
                <Link to='/home/archive' onClick={() => this.changeTitle('Archive')}>
                  <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                    <img src={archive} alt="archive" style={{ marginRight: '30px' }} />
                    <span>Archive</span>
                  </Button>
                </Link>
                <Link to='/home/trash' onClick={() => this.changeTitle('Trash')}>
                  <Button style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'start' }}>
                    <img src={trash} alt="trash" style={{ marginRight: '30px' }} />
                    <span>Trash</span>
                  </Button>
                </Link>
              </List>
            </Drawer>
          </MuiThemeProvider>
        </div>
        <EditLabelDialog ref={labeldialog => { this.labeldialog = labeldialog }}
          labels={this.state.labels} labelCreated={this.labelCreated}
          labelDeleted={this.labelDeleted} labelUpdated={this.labelUpdated}
        />
      </div>
    );
  }
}

export default Sidebar;
