import React, { Component } from 'react';
import { Card, TextField, Button, withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Keep from '../../assets/image/keep.png';
import { passValidate } from '../../services/Validator';
import { postParam, headerForm } from '../../services/HttpService';

const styles = {
  label: {
    textTransform: 'capitalize'
  }
}

class Changepassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpwd: "",
      displayCard: true,
      responseMsg: ""
    };
    this.btnDisable = true;
    this.validate = this.validate.bind(this);
  }

  handleInputEvent = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate() {
    if (passValidate(this.state.password) && passValidate(this.state.confirmpwd)) {
      if (this.state.password === this.state.confirmpwd)
        this.btnDisable = false;
      else
        this.btnDisable = true;
    } else
      this.btnDisable = true;
  }

  changePassword = () => {
    const token = this.props.match.params.token;
    const param = {
      password: this.state.password
    }
    postParam('http://localhost:8080/user/newpassword/' + token, param, headerForm)
      .then((res) => {
        console.log(res.data);
        this.setState({
          responseMsg: 'Password has been succesfully changed, you can now log in with new password.',
          displayCard: false
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({
          responseMsg: 'There was some problem in changing your password, please request for a new link.',
          displayCard: false
        });
      });
  }

  render() {
    const { classes } = this.props;
    this.validate();
    return (
      <div className="User-card">
        <Card className="Margin-auto Login-card">
          <div style={{ padding: '20px' }}>
            {
              this.state.displayCard ?
              <div>
                <img src={Keep} alt="keep-logo" className="Keep-logo" />
                <div className="Card-text">
                  <p>Enter new password</p>
                </div>
                <div>
                  <TextField
                    required
                    label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    helperText="Minimum 8 characters, no spaces"
                    onChange={this.handleInputEvent}
                    style={{ width: '100%' }}
                  />
                  <TextField
                    required
                    label="Confirm Password"
                    type="password"
                    name="confirmpwd"
                    onChange={this.handleInputEvent}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <Button
                    disabled={this.btnDisable}
                    variant="outlined"
                    color="primary"
                    classes={{ label: classes.label }}
                    onClick={this.changePassword}
                    style={{ width: '100%', marginTop: '30px' }}>
                    Change my password
                  </Button>
                </div>
                <div className="login-footer">
                  <Link
                    style={{ fontSize: '16px', marginLeft: '5px' }}
                    to="/login">
                    Cancel
                  </Link>
                </div>
              </div>
              :
              <div>
                <div>
                  <Typography
                    variant="headline"
                    style={{ verticalAlign: 'center', color: 'red' }}>
                    {this.state.responseMsg}
                  </Typography>
                  <div className="login-footer">
                    <Link
                      style={{ fontSize: '16px', alignItems: 'center' }}
                      to="/login">
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            }
          </div>
        </Card>
      </div>
    );
  }
}

Changepassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Changepassword);
