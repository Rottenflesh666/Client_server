import decode from "jwt-decode";

export default class AuthService {
  constructor(domain) {
    this.domain = domain || "http://localhost:8000";
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    return this.fetch(this.domain +"/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      AuthService.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const token = localStorage.getItem("id_token");
    return !!token && !AuthService.isTokenExpired(token);
  }

  static isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  static setToken(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  getProfile() {
    return decode(localStorage.getItem("id_token"));
  }

  fetch(url, options) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("id_token");
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(AuthService._checkStatus)
      .then(response => response.json())
  }

  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
