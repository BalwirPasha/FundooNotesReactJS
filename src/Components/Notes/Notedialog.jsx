import React, { Component } from 'react';
import { Dialog } from '@material-ui/core'
import CreateNote from './CreateNote';

class Notedialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
          <Dialog>
              <CreateNote />
          </Dialog>
      </div>
    );
  }
}

export default Notedialog;
