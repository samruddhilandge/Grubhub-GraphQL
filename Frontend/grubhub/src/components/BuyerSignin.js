import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { rooturl } from "../config";
import { connect } from "react-redux";
import { BUYER_SIGNIN } from "../redux/constants/action-types";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import { signinBuyermutation } from "../mutations/mutations";

class BuyerSignin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      pwdError: "",
      invalidError: "",
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validate = () => {
    let emailError = "";
    let pwdError = "";

    if (!this.state.email) {
      emailError = "Email is required";
    }
    if (!this.state.password) {
      pwdError = "Password is required";
    }
    if (emailError || pwdError) {
      this.setState({ emailError, pwdError });
      return false;
    }

    return true;
  };

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    this.props
      .mutate({ variables: data })
      .then(res => {
        this.setState({ redirect: true });
        localStorage.setItem("buyer_name:", res.name);
        localStorage.setItem("buyer_id", res._id);
      })
      .catch(err => {
        console.log(err);
      });

    const isValid = this.validate();
    if (isValid) {
    }
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/buyerhome" />;
    } else {
      redirectVar = <Redirect to="/buyersignin" />;
    }

    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2 style={{ fontWeight: "bolder" }}>Buyer Sign in</h2>
                <p>Please enter your username and password</p>
              </div>

              <div class="form-group">
                <input
                  onChange={this.onChange}
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  autoFocus
                />
                <div style={{ color: "red" }}>{this.state.emailError}</div>
              </div>
              <div class="form-group">
                <input
                  onChange={this.onChange}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
                <div style={{ color: "red" }}>{this.state.pwdError}</div>
              </div>
              <button onClick={this.onSubmit} class="btn btn-primary">
                Login
              </button>
              <br />
              <br />
              <a href="/buyersignup">Create Account</a>
              <div style={{ color: "red" }}>{this.state.invalidError}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BuyerSignin = graphql(signinBuyermutation)(BuyerSignin);
export default BuyerSignin;
