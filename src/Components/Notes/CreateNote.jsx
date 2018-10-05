import React, { Component } from 'react';
import { Card, Typography, IconButton, Input } from '@material-ui/core';
import '../../assets/css/note.css';
import NewList from '../../assets/icons/newlist.svg';
import image from '../../assets/icons/image.svg';
import draw from '../../assets/icons/draw.svg';

class Createnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Card className="Take-note Margin-auto">
          <div>
            <Typography variant="body1" style={{ padding: '12px 10px' }}>
              Take a note...
            </Typography>
          </div>
          <div>
            <IconButton>
              <img src={NewList} alt="list" />
            </IconButton>
            <IconButton>
              <img src={image} alt="list" />
            </IconButton>
            <IconButton disabled={true}>
              <img src={draw} alt="list" />
            </IconButton>
          </div>
        </Card>
        <Card className="Create-note Margin-auto">
          <div>
            <div>
              <Input placeholder="Title" disableUnderline={true} style={{ width: '80%', margin: '10px' }}></Input>
              <div style={{ float: 'right', margin: '10px' }}>
                <img src={image} alt="list" />
              </div>
              <Input placeholder="Take a note..." disableUnderline={true} style={{ width: '100%', margin: '0px 10px' }} />
            </div>
            <div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Createnote;
