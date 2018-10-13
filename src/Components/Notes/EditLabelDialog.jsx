import { Button, createMuiTheme, Dialog, DialogActions, DialogContent, Divider, IconButton, Input, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import check from '../../assets/icons/check.svg';
import close from '../../assets/icons/close.svg';
import { postData, headerJsonWithToken, deleteReq, putParam, headerUrl } from '../../services/HttpService';

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
      open: false,
      labels: [],
      labelsView: [],
      createLabelField: '',
      createdlabel: null
    };
    this.arr = [1, 1, 1, 1, 1, 1]
  }

  componentDidMount = () => {

  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createLabel = () => {
    if (this.state.createLabelField !== "") {
      let data = { labelName: this.state.createLabelField };
      let header = headerJsonWithToken();
      postData('http://localhost:8080/note/label/createlabel', data, header)
        .then(res => {
          this.labelCreated(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  labelCreated = async (label) => {
    let labelsView = this.state.labelsView;
    labelsView.push(<LabelX label={label} key={label.labelId} labelDeleted={this.labelDeleted} labelUpdated={this.labelUpdated}/>)
    await this.setState({
      createLabelField: "",
      labelsView: labelsView
    });
    this.props.labelCreated(label);
  }

  labelDeleted = (label) => {
    console.log();
    this.setState({
      labelsView: this.state.labelsView.filter(labelX => (label.labelId !== parseInt(labelX.key, 10)))
    })
    this.props.labelDeleted(label);
  }

  labelUpdated = (label) => {
    console.log(label);
    this.props.labelUpdated(label);
  }

  openLabelDialog = () => {
    this.setState({
      open: true,
      labels: this.props.labels,
      labelsView: this.props.labels.map((label) => {
        return <LabelX label={label} key={label.labelId} labelDeleted={this.labelDeleted} labelUpdated={this.labelUpdated} />
      })
    })
  }

  closeLabelDialog = () => {
    this.createLabel();
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog scroll="paper" open={this.state.open} onClose={this.closeLabelDialog}>
          <DialogContent>
            <div>
              <h3>Edit Labels</h3>
              <div>
                <IconButton>
                  <img src={close} alt="close" />
                </IconButton>
                <Input name="createLabelField"
                  value={this.state.createLabelField}
                  onChange={this.handleInputChange}
                  placeholder="Create new label">
                </Input>
                <IconButton onClick={this.createLabel}>
                  <img src={check} alt="check" />
                </IconButton>
              </div>
              {this.state.labelsView}
              <Divider></Divider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeLabelDialog}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

class LabelX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelName: props.label.labelName
    }
  }

  componentDidMount() {
    this.setState({
      labelName: this.props.label.labelName
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  deleteLabel = () => {
    const header = headerJsonWithToken();
    deleteReq('http://localhost:8080/note/label/deletelabel/' + this.props.label.labelId, header)
      .then(res => {
        this.props.labelDeleted(this.props.label);
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  updateLabel = () => {
    if (this.state.labelName !== this.props.label.labelName) {
      const header = headerUrl();
      const param = {
        labelId: this.props.label.labelId,
        labelName: this.state.labelName
      }
      putParam('http://localhost:8080/note/label/updatelabel', param, header)
        .then(res => {
          let label = this.props.label;
          label.labelName = this.state.labelName;
          this.props.labelUpdated(label);
        })
        .catch(err => {
          console.log(err.response);          
        })
    }
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.deleteLabel}>
          <img src={close} alt="close" />
        </IconButton>
        <Input name="labelName"
          disableUnderline={true}
          value={this.state.labelName}
          onChange={this.handleInputChange}>
        </Input>
        <IconButton onClick={this.updateLabel}>
          <img src={check} alt="check" />
        </IconButton>
      </div>
    );
  }
}

export default EditLabelDialog;