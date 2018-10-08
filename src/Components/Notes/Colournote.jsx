import { Avatar, createMuiTheme, IconButton, Menu, MuiThemeProvider, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import colour from '../../assets/icons/colour.svg';

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        height: '110px',
        width: '125px'
      },
    }
  }
});

class Colournote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.colourArr = ['#fff', '#ff8a80', '#ffd180',
      '#ffff8d', '#ccff90', '#a7ffeb',
      '#80d8ff', '#82b1ff', '#b388ff',
      '#f8bbd0', '#d7ccc8', '#cfd8dc'
    ];
    this.colourName = ['White', 'Red', 'Orange',
      'Yellow', 'Green', 'Teal',
      'Blue', 'Dark Blue', 'Purple',
      'Pink', 'Brown', 'Grey'
    ];
    this.arr = [];
  }

  openPalette = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
    this.arr = this.colourArr.map((color, ind) => {
      return <Avatar title={this.colourName[ind]} key={ind} onClick={() => this.addColour(color)} style={{ height: '25px', width: '25px', margin: '2px', backgroundColor: [color], border: '1px solid #dbdbdb' }}></Avatar>
    })
  }

  addColour = (color) => {
    console.log(color);
    this.props.changeColor(color);
  }

  changeColor = (color) => {
    //color note api
    console.log(color);
  }

  render() {
    return (
      <div>
        <Tooltip title="Change color">
          <IconButton onClick={this.openPalette}>
            <img src={colour} alt="colour" />
          </IconButton>
        </Tooltip>
        <MuiThemeProvider theme={theme}>
          <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={() => { this.setState({ anchorEl: null }) }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {this.arr}
            </div>
          </Menu>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Colournote;
