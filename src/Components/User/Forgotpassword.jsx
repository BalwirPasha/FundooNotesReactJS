import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from '@material-ui/core';
import Keep from '../../assets/image/keep.png';
import { Link } from 'react-router-dom';
import { emailValidate } from '../../services/Validator';
import { postParam, headerForm } from '../../services/HttpService';

class Forgotpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      confirmemail: "",
      displayCard: true,
      errMsg: "",
      responseMsg: "Response"
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
    if (emailValidate(this.state.emailId) && emailValidate(this.state.confirmemail)) {
      if (this.state.emailId === this.state.confirmemail)
        this.btnDisable = false;
      else
        this.btnDisable = true;
    } else
      this.btnDisable = true;
  }

  forgotPassword = () => {
    const params = {
      email: this.state.emailId,
    }
    postParam('http://localhost:8080/user/forgotpassword', params, headerForm)
      .then((res) => {
        console.log(res.data);
        this.setState({
          responseMsg: 'Password reset link has been sent, please check your email to change your password',
          displayCard: false
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.message === 'Incorrect email id') {
          this.setState({
            errMsg: 'Incorrect EmailId, please check the email id you provided'
          });
        } else {
          this.setState({
            responseMsg: 'Password reset link cant be sent, please try again after sometime',
            displayCard: false
          });
        }
      });
  }

  render() {
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
                    <p>Reset your password</p>
                  </div>
                  <div>
                    <TextField
                      required
                      label="Email-Id"
                      type="email"
                      name="emailId"
                      margin="normal"
                      onChange={this.handleInputEvent}
                      style={{ width: '100%' }}
                    />
                    <TextField
                      required
                      label="Confirm Email-Id"
                      type="email"
                      name="confirmemail"
                      margin="normal"
                      onChange={this.handleInputEvent}
                      style={{ width: '100%' }}
                    />
                    <div>
                      <Typography
                        variant='body2'>
                        {this.state.errMsg}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Button
                      disabled={this.btnDisable}
                      variant="outlined"
                      color="primary"
                      style={{ width: '100%', marginTop: '30px', textTransform: 'capitalize' }}
                      onClick={this.forgotPassword}>
                      Change my password
                    </Button>
                  </div>
                  <div className="login-footer">
                    <Link
                      style={{ fontSize: '16px', marginLeft: '5px' }}
                      to="/login">
                      Back
                    </Link>
                  </div>
                </div>
                :
                <div className="Margin-auto">
                  <Typography
                    variant="headline"
                    style={{ verticalAlign: 'center', color: 'red' }}>
                    {this.state.responseMsg}
                  </Typography>
                  <div className="login-footer">
                    <Link
                      style={{ fontSize: '16px', alignItems: 'center' }}
                      to="/login">
                      Back
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

export default Forgotpassword;
