const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

const jwtMW = exjwt({
  secret: "4 the lich king"
});

let user = {
  id: 1,
  username: "admin",
  password: "admin"
};

module.exports = (app) => {
  app.post("/api/login",(req,res) => {
    const {username, password} = req.body;
    if(username ===user.username && password===user.password){
      let token = jwt.sign({id: user.id}, "4 the lich king",{expiresIn: 129600});
      res.json({
        success: true,
        err: null,
        token
      });
    }
    else{
      res.status(401).json({
        success: false,
        token: null,
        err: "username or password in incorrect"
      });
    }
  });
};
