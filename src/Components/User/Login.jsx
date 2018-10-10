import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from '@material-ui/core';
import { NavLink, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Keep from '../../assets/image/keep.png';
import { emailValidate, passValidate } from '../../services/Validator';
import { postData, headerJson } from '../../services/HttpService';
import { withStyles } from '@material-ui/core/styles';
import '../../assets/css/login.css';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailErr: "",
      loginSuccess: false
    };
    //this.emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9]+)[.]([a-zA-Z]{2,5})$/;
    this.btnDisabled = true;
    //this.fieldErr = false;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    this.fieldErr = true;
  }

  login = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    postData('http://localhost:8080/user/login', data, headerJson)
      .then((res) => {
        localStorage.setItem("fundooUser", JSON.stringify(res.data));
        this.setState({
          loginSuccess : true
        })
      })
      .catch((err) => {
        if (err.response.data.message === 'Incorrect Password')
          this.setState({
            emailErr: 'Incorrect Password'
          });
        if (err.response.data.message === 'Invalid Email Id')
          this.setState({
            emailErr: 'Invalid Email Id'
          });
        if (err.response.data.message === 'Please Activate Account First')
          this.setState({
            emailErr: 'Please Activate Account First'
          });
      });
  }

  enableButton() {
    if (emailValidate(this.state.email) && passValidate(this.state.password)) {
      this.btnDisabled = false;
    }
    else
      this.btnDisabled = true;
  }

  render() {
    // const { classes } = this.props;
    if (this.state.loginSuccess) {
      return <Redirect to="/home" push={true}></Redirect>
    }
    this.enableButton();
    return (
      <div className="User-card">
        <Card className="Login-card Margin-auto">
          <div style={{ padding: '20px' }}>
            <img src={Keep} alt="keep-logo" className="Keep-logo" />
            <div className="Card-text">
              <p>Sign In</p>
            </div>
            <div>
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                className="ipfields"
                onChange={this.handleInputChange}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                margin="normal"
                helperText="Minimum 8 characters, no spaces"
                className="ipfields"
                onChange={this.handleInputChange}
              />
            </div>
            <Typography style={{ color: 'red' }}>
              {this.state.emailErr}
            </Typography>
            <div>
              <Button
                disabled={this.btnDisabled}
                onClick={this.login.bind(this)}
                variant="contained"
                color="primary"
                // classes={{
                //   root: classes.root, // class name, e.g. `classes-nesting-root-x`
                //   label: classes.label, // class name, e.g. `classes-nesting-label-x`
                // }}
                style={{ width: '100%', marginTop: '20px', textTransform: 'capitalize' }}>
                Sign In
            </Button>
            </div>
            <div className="login-footer">
              <Link to="/forgotpassword">Forgot Password?</Link>
              <NavLink to="/register">Create an account</NavLink>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
