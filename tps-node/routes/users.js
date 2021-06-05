var express = require('express');
const { login } = require('../controllers/users');
const { SuccessModel, FailModel } = require('../model/resModel');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  login(username, password).then((result) => {
    if (result.username === username) {
      res.cookie('username', username, { maxAge: 36000, httpOnly: true });
      res.json(new SuccessModel('登录成功'));
    } else {
      res.json(new FailModel('登录失败'));
    }
  })
});

module.exports = router;
