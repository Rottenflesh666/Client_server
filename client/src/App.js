import React, { Component } from 'react';
import { observer } from "mobx-react";
import AppStore from "./AppStore";
import AuthService from "./components/AuthService/AuthService";
import withAuth from "./components/withAuth/withAuth";
import SingleInput from "./components/SingleInput/SingleInput";
import Status from "./components/Status/Status";
import './App.css';

const Auth = new AuthService();

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }

  clearForm = (e) => {
    e.preventDefault();

    AppStore.clearForm(e);
  };

  handleFormSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("id_token");
    if (token !== null)
      token = "Bearer " + localStorage.getItem("id_token");
    fetch("/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(AppStore.personInfo)
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.status === 200) {
          AppStore.setSuccessStatus(response);
        } else if (response.status === 404) {
          AppStore.setNotFoundStatus();
        } else if (response.status === 403) {
          localStorage.removeItem("id_token");
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.clearForm(e);
  };

  render() {
    return (
      <form className={"container"} onSubmit={this.handleFormSubmit}>
        <SingleInput
          title={"Login:  "}
          name={"loginField"}
          inputType={"text"}
          value={AppStore.personInfo.login}
          controlFunc={AppStore.handleLoginChange}
          placeholder={"Login"} />
        <SingleInput
          title={"Pass : "}
          name={"passwordField"}
          inputType={"password"}
          value={AppStore.personInfo.password}
          controlFunc={AppStore.handlePasswordChange}
          placeholder={"Password"} />
        <input
          type={"submit"}
          className={"frmSubmitBtn"}
          value={"Submit"} />
        <button className={"btnClearForm"} onClick={this.clearForm}> Clear form</button>
        <Status status={AppStore.personInfo.status} />
        <p className="App-login">
          <button type="button" className="form-submit" onClick={this.handleLogout}> Logout</button>
        </p>
      </form>
    )
      ;
  }
}

export default withAuth(App);
