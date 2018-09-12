module.exports = (app) => {
  require("./auth")(app);
  require("./global")(app);
  require("./login")(app);
};
