const jwt = require('jsonwebtoken');

module.exports.auth = function(req, res, next) {
  if (req.url === "/db") {
    if (req.headers.authorization !== "null") {
      let kek = req.headers.authorization.split(' ');
      if (kek.length === 2 && jwt.decode(kek[1]) !== null)
          return next();
      }
    }
  console.log("not today");
  res.json({
    status: 403
  });
};
