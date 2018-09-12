import React, { Component } from 'react';
import AppStore from "./AppStore";
import AuthService from "./components/AuthService/AuthService";
import withAuth from "./components/withAuth/withAuth";
import SingleInput from "./components/SingleInput/SingleInput";
import Status from "./components/Status/Status";
import './App.css';
const Auth = new AuthService();

class App extends Component {
  constructor(props) {
    super(props);
  /*  this.state= {
      login: "",
      password: "",
      status: {
       fullName: "",
        light: "",
        gas: "",
        water: ""
      }
    };*/
  }

  /* componentDidMount() {
     // simulating a call to retrieve user data
     // (create-react-app comes with fetch polyfills!)
     fetch('http://localhost:3000/kek', {
       method: 'post',
       headers: {
         'Accept': 'application/json, text/plain, *!/!*',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({a: 7, str: 'Строка: &=&'})}).then(res=>res.json())
       .then(res => console.log(res));
   }*/

  handleLogout(){
    Auth.logout();
    this.props.history.replace("/login");
  }

  /*handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  };*/

  /*handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };*/

  clearForm (e){
    e.preventDefault();
    AppStore.clearForm(e);
    /*this.setState({
      login: "",
      password: "",
      status: {
        fullName: "",
        light: "",
        gas: "",
        water: ""
      }
    })*/
  };

  handleFormSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("id_token");
    if(token !== null )
      token = "Bearer " + localStorage.getItem("id_token");
    fetch("/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.status === 200) {
          AppStore({
            status: {
              fullName: response.user.firstName + " " + response.user.lastName,
              light: "light: " + response.user.meter.light,
              gas: "gas:" + response.user.meter.gas,
              water: "water:" + response.user.meter.water
            }
          });
        } else if (response.status === 404) {
          AppStore({
            status: {
              fullName: "Not found X_X"
            }
          });
        } else if(response.status === 403) {
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
          value={AppStore.login}
          controlFunc={AppStore.handleLoginChange}
          placeholder={"Login"} />
        <SingleInput
          title={"Pass : "}
          name={"passwordField"}
          inputType={"password"}
          value={AppStore.password}
          controlFunc={AppStore.handlePasswordChange}
          placeholder={"Password"} />
        <input
          type={"submit"}
          className={"frmSubmitBtn"}
          value={"Submit"} />
        <button className={"btnClearForm"} onClick={this.clearForm}> Clear form</button>
        {/*<Status status={AppStore.status} />*/}
        <p className="App-login">
          <button type="button" className="form-submit" onClick={this.handleLogout}> Logout </button>
        </p>
      </form>
    )
      ;
  }
}

export default withAuth(App);
