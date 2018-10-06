import { Card, IconButton } from '@material-ui/core';
import React, { Component } from 'react';
import '../../assets/css/note.css';
import more from '../../assets/icons/more.svg';
import Addimage from './Addimage';
import Archivenote from './Archivenote';
import Collaborator from './Collaborator';
import Colournote from './Colournote';
import Pinnote from './Pinnote';
import Reminder from './Reminder';

class Notetemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff'
    };
  }

  changeColor = (color) => {
    this.setState({
      color : color
    })
    this.refs.colornote.changeColor(color);
  }

  render() {
    return (
      <div>
        <Card style={{backgroundColor:[this.state.color]}} className="Note-template">
          <div style={{ margin: '0px 10px' }}>
            <div style={{ float: 'right' }}>
              <Pinnote />
            </div>
            <p>
              <strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quisquam odit adipisci, necessitatibus iure soluta at, dicta a excepturi doloremque eos provident dolorum? Repellendus officia asperiores saepe minus alias maiores.
              </strong>
            </p>
            <p style={{fontFamily:'Roboto Slab'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi delectus quia molestiae provident! Veniam ipsa, doloribus accusantium asperiores quis nesciunt perferendis praesentium debitis ipsam maiores molestiae illum eum, iure sapiente.
            </p>
          </div>
          <div className="Note-template-footer">
            <Reminder />
            <Collaborator />
            <Colournote ref="colornote" changeColor={this.changeColor}/>
            <Addimage />
            <Archivenote />
            <IconButton>
              <img src={more} alt="menu" />
            </IconButton>
          </div>
        </Card>
      </div>
    );
  }
}

export default Notetemplate;
