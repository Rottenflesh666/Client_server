const mongoose = require("mongoose");
const config = require("./config");
const { db: {login, password, host, port, name } } = config;
const connectionSting = "mongodb://" + login + ":" + password + "@" + host + ":" + port + "/" + name;

module.exports = {
  dbConnect: function() {
    mongoose.connect(connectionSting, { authSource: "admin" })
      .then(() => console.log("mongoDB connected"))
      .catch(e => console.log(e));
  }
};

