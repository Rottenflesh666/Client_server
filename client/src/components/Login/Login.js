import React, { Component } from "react";
import AuthService from "../AuthService/AuthService";
import SingleInput from "../SingleInput/SingleInput";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
      alert(err);
    })
  }

  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.push("/");
  }

  render() {
    return (
      <div className="loginForm">
        <h1 className="loginLabel">Login</h1>
        <form className="loginBody" onSubmit={this.handleFormSubmit}>
          <SingleInput
            className="form-input"
            name={"username"}
            inputType={"text"}
            controlFunc={this.handleChange}
            placeholder={"Login"} />
          <SingleInput
            className="form-input"
            name={"password"}
            inputType={"password"}
            controlFunc={this.handleChange}
            placeholder={"password"} />
          <input
            type={"submit"}
            className={"frmSubmitBtn"}
            value={"Submit"} />
        </form>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
      }
    )
  }
}

export default Login;
