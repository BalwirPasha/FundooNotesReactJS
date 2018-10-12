import { Button, createMuiTheme, Dialog, DialogActions, DialogContent, Divider, IconButton, Input, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import check from '../../assets/icons/check.svg';
import close from '../../assets/icons/close.svg';

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        width: '300px'
      }
    }
  }
})

class EditLabelDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.arr = [1, 1, 1, 1, 1, 1]
  }


  openLabelDialog = () => {
    this.setState({
      open: true
    })
  }

  closeLabelDialog = () => {
    this.setState({
      open: false
    })
  }

  render() {
    let labels = this.arr.map(num => {
      return <div>
        <IconButton>
          <img src={close} alt="close" />
        </IconButton>
        <Input disableUnderline={true} value="Label" placeholder="Create new label">
        </Input>
        <IconButton>
          <img src={check} alt="check" />
        </IconButton>
      </div>
    })

    return (
      <MuiThemeProvider theme={theme}>
        <Dialog scroll="paper" open={this.state.open} onClose={this.closeLabelDialog}>
          <DialogContent>
            <div >
              <h3>Edit Labels</h3>
              <div>
                <IconButton>
                  <img src={close} alt="close" />
                </IconButton>
                <Input placeholder="Create new label">

                </Input>
                <IconButton>
                  <img src={check} alt="check" />
                </IconButton>
              </div>
              {labels}
              <Divider></Divider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default EditLabelDialog;