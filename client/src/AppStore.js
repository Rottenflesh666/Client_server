import { extendObservable } from "mobx";

//import { observer } from "mobx-react";


class AppStore {
  constructor() {
    extendObservable(this, {
      login: "",
      password: "",
      status: {
        fullName: "",
        light: "",
        gas: "",
        water: ""
      }
    })
  }


  handleLoginChange = (e) => {
    this.login = e.target.value;
  };

  handlePasswordChange(e) {
    this.password = e.target.value;
  };

  clearForm = (e) => {
    this({
      login: "",
      password: "",
      status: {
        fullName: "",
        light: "",
        gas: "",
        water: ""
      }
    })
  };
}

export default new AppStore();
