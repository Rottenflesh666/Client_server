const User = require("../models/User");
const Meter = require("../models/Meter");
const authCheck = require("../middleware/auth");

//метод выполняет функцию логина
module.exports = (app) => {
  app.post("/db", authCheck.auth, function(req, res) {
    console.log("ok");
    User.findOne({
      login: req.body.login,
      password: req.body.password
    }).populate("meter").exec(function(err, user) {
      if (err) return handleError(err);
      if (user) {
        res.json({
          user: user,
          status: 200
        });
      } else {
        res.json({
          status: 404
        })
      }
    });
  });
};

//save option
/*let user = new User({
  _id: new mongoose.Types.ObjectId(),
  firstName: "maman",
  lastName: "odmena",
  login: req.body.login,
  password: req.body.password
});
user.save(function(err) {
  if (err) return handleError(err);
  const story = new Meter({
    user: user._id,
    light: 1337,
    gas: 1337,
    water: 1337
  });
  user.meter = story;
  user.save();
  story.save();
});*/
