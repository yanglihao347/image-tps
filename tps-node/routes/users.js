var express = require('express');
const { login, register } = require('../controllers/users');
const { SuccessModel, FailModel } = require('../model/resModel');
var router = express.Router();

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;
  register(username, password).then((result) => {
    if (result.username === username) {
      res.cookie('username', username, { maxAge: 36000000, httpOnly: true });
      res.json(new SuccessModel('注册成功'));
    } else {
      res.json(new FailModel('注册失败'));
    }
  })
});

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  login(username, password).then((result) => {
    if (result.username === username) {
      res.cookie('username', username, { maxAge: 36000000, httpOnly: true });
      res.json(new SuccessModel('登录成功'));
    } else {
      res.json(new FailModel('登录失败'));
    }
  })
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('username');
  res.json(new SuccessModel('退出成功'));
});

module.exports = router;
