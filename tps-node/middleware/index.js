const { FailModel } = require("../model/resModel");

const isLogin = (req, res, next) => {
  const { username } = req.cookies;
  if (username) {
    next();
  } else {
    res.json(new FailModel('需要登录', 301));
  }
}

module.exports = {
  isLogin
}