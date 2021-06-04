const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { uploadCloud, getList } = require('../controllers/tps');

const upload = multer({
  dest: 'uploads/',
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  // 上传接口，接受前端上传的图片文件，
  // req.body: {
  //   width,
  //   height,
  //   size
  // }
  const file = req.file;
  console.log(req.file, req.body);
  fs.renameSync('uploads/' + file.filename, 'uploads/' + file.originalname);
  const result = uploadCloud(file.originalname);
  result.then((data) => {
    res.json(data);
  });
});

router.get('/list', (req, res, next) => {
  const { pageNo, pageSize } = req.query;
  const result = getList(pageNo, pageSize);
  result.then((data) => {
    res.json(data);
  });
});

module.exports = router;
