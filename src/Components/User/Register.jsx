import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from '@material-ui/core';
import Keep from '../../assets/image/keep.png';
import Eye from '../../assets/image/eye.png';
import Eyeoff from '../../assets/image/eye-off.png';
import { Link } from 'react-router-dom';
import '../../assets/css/login.css';
import { emailValidate, nameValidate, passValidate } from '../../services/Validator';
import { postData, headerJson } from '../../services/HttpService';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdEye: true,
      registerForm: {},
      displayCard: true,
      emailErr: ""
    };
    this.btnDisabled = true;
    this.btnDisabledPass = true;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  togglepassword = () => {
    this.setState({
      pwdEye: !this.state.pwdEye
    });
  }

  handleInputChange(e) {
    this.setState({
      registerForm: {
        ...this.state.registerForm, [e.target.name]: e.target.value
      }
    });
  }

  register = () => {
    const data = this.state.registerForm;
    postData('http://localhost:8080/user/registration', data, headerJson)
      .then((res) => {
        console.log(res.data);
        this.setState({
          emailErr : 'Succesfully registered, please verify your account. Verification link has been sent to your email.',
          displayCard : false
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.message === 'Email already registered') {
          this.setState({
            emailErr: 'Email Id already registered.'
          });
        } else {
          this.setState({
            emailErr : 'There was some problem in registration, please try again later.',
            displayCard : false
          });
        }
      });
  }

  validate() {
    if (emailValidate(this.state.registerForm.email)
      && passValidate(this.state.registerForm.password)
      && nameValidate(this.state.registerForm.firstName)
      && nameValidate(this.state.registerForm.lastName)
      && passValidate(this.state.registerForm.confirmpwd)) {
      if (this.state.registerForm.password === this.state.registerForm.confirmpwd)
        this.btnDisabled = false;
      else
        this.btnDisabled = true;
    }
    else
      this.btnDisabled = true;
  }

  render() {
    this.validate();
    return (
      <div className="User-card">
        <Card className="Margin-auto Register-card">
          <div style={{ padding: '20px' }}>
            {
              this.state.displayCard ?
                <div>
                  <img src={Keep} alt="keep-logo" className="Keep-logo" />
                  <div className="Card-text">
                    <p>Registration</p>
                  </div>
                  <div className="rfl">
                    <div>
                      <TextField
                        required
                        label="First Name"
                        type="text"
                        name="firstName"
                        margin="normal"
                        onChange={this.handleInputChange}
                      />
                      <Typography variant="caption" gutterBottom></Typography>
                    </div>
                    <div>
                      <TextField
                        required
                        label="Last Name"
                        type="text"
                        name="lastName"
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                      <Typography variant="caption" gutterBottom></Typography>
                    </div>
                  </div>
                  <div>
                    <TextField
                      required
                      label="Email-Id"
                      type="email"
                      name="email"
                      onChange={this.handleInputChange}
                      margin="normal"
                      style={{ width: '100%' }}
                    />
                    <Typography variant="caption" gutterBottom></Typography>
                  </div>
                  <div className="rfl">
                    <div>
                      <TextField
                        required
                        label="Password"
                        type={this.state.pwdEye ? "password" : "text"}
                        name="password"
                        helperText="Minimum 8 characters."
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={{ paddingRight: '20px' }}
                      />
                      <Typography variant="caption" gutterBottom></Typography>
                    </div>
                    <div>
                      <TextField
                        required
                        label="Confirm Password"
                        type={this.state.pwdEye ? "password" : "text"}
                        name="confirmpwd"
                        onChange={this.handleInputChange}
                        style={{ paddingRight: '20px' }}
                        margin="normal"
                      />
                      <Typography variant="caption" gutterBottom></Typography>
                    </div>
                    <div>
                      <img
                        onClick={this.togglepassword}
                        className="pwdEye"
                        src={this.state.pwdEye ? Eyeoff : Eye}
                        alt="show/hide pass"
                      />
                    </div>
                  </div>
                  <Typography
                    variant="body2"
                    style={{ color: 'red' }}>
                    {this.state.emailErr}
                  </Typography>
                  <div >
                    <Button
                      disabled={this.btnDisabled}
                      variant="outlined"
                      color="secondary"
                      onClick={this.register}
                      style={{ width: '100%', marginTop: '30px', textTransform: 'capitalize' }}>
                      Register
                    </Button>
                  </div>
                  <div className="login-footer">
                    <Link
                      style={{ fontSize: '16px', marginLeft: '5px' }}
                      to="/login">
                      Sign in instead?
                    </Link>
                  </div>
                </div>
                :
                <div>
                  <Typography
                    variant="headline"
                    gutterBottom
                    style={{color: 'red'}}
                  >
                    {this.state.emailErr}
                  </Typography>
                  <div className="login-footer">
                    <Link
                      style={{ fontSize: '16px', alignItems: 'center' }}
                      to="/login">
                      Sign In
                  </Link>
                  </div>
                </div>
            }
          </div>
        </Card>
      </div>
    );
  }
}

export default Register;
