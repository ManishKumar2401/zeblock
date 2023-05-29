const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const requireAuth = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]
  if (token == "null") {
    return res.status(401).send("unauthorized request")    
  }
  
  let payload = jwt.verify(token, process.env.TOKEN_SECRET)
  if (!payload) {
    return res.status(401).send("unauthorized request")
  }

  req.userId = payload.subject
  next()
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  //   check token
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        let user = await Users.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
