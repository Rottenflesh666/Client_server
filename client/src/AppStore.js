import { observable, computed, action } from "mobx";

class AppStore {
  @observable personInfo;

  constructor() {
    this.personInfo = {
      login: "",
      password: "",
      status: {
        fullName: "",
        light: "",
        gas: "",
        water: ""
      }
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  };

  setSuccessStatus = (response) => {
    this.personInfo.status = {
      fullName: response.user.firstName + " " + response.user.lastName,
      light: "light: " + response.user.meter.light,
      gas: "gas:" + response.user.meter.gas,
      water: "water:" + response.user.meter.water
    };
  };

  setNotFoundStatus = () => {
    this.personInfo.status = {
      fullName: "Not found X_X"
    };
  };

  //getLogin
  @action
  handleLoginChange = (e) => {
    e.preventDefault();
    this.personInfo.login = e.target.value;
  };

  handlePasswordChange = (e) => {
    e.preventDefault();
    this.personInfo.password = e.target.value;
  };

  clearForm = () => {
    this.personInfo = {
      login: "",
      password: "",
      status: {
        fullName: "",
        light: "",
        gas: "",
        water: ""
      }
    }
  };
}

export default new AppStore();
export { AppStore };
