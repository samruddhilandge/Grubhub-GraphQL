import React, { Component } from "react";
import "../App.css";
import { Redirect } from "react-router";
import { graphql } from "react-apollo";
import { signinOwnermutation } from "../mutations/mutations";

class OwnerSignin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      restaurant_id: 0,
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
        console.log("res", res);
        localStorage.setItem("restaurant_name:", res.restaurant_name);
        localStorage.setItem("restaurant_id", res._id);
        localStorage.setItem("owner_name", res.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/ownerhome" />;
    } else {
      redirectVar = <Redirect to="/ownersignin" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2 style={{ fontWeight: "bolder" }}>Owner Sign in</h2>
                <p>Please enter your username and password</p>
              </div>

              <div class="form-group">
                <input
                  onChange={this.onChange}
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="email"
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
              <a href="/ownersignup">Create Account</a>
              <div style={{ color: "red" }}>{this.state.invalidError}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OwnerSignin = graphql(signinOwnermutation)(OwnerSignin);
export default OwnerSignin;
