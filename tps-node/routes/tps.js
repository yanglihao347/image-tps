const express = require('express');
const router = express.Router();
const multer = require('multer');
// const crypto = require('crypto');
const { uploadCloud, getList } = require('../controllers/tps');
const { SuccessModel, FailModel } = require('../model/resModel');
const { isLogin } = require('../middleware/index');

const upload = multer({
  dest: 'uploads/',
});

router.post(
  '/upload',
  isLogin,
  upload.single('file'),
  async (req, res, next) => {
    // 上传接口，接受前端上传的图片文件
    const file = req.file;
    console.log(req.file, req.body);
    const { username } = req.cookies;
    const result = await uploadCloud(file, username);
    // const content = '12345678';
    // const result = crypto.createHash('md5').update(content).digest("hex");
    // console.log(result)
    res.json(new SuccessModel(result));
  }
);

router.get('/list', isLogin, async (req, res, next) => {
  const { pageNo, pageSize } = req.query;
  const { username } = req.cookies;
  const result = await getList(pageNo, pageSize, username);
  res.json(new SuccessModel(result));
});

module.exports = router;
