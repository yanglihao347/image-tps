const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCloud, getList } = require('../controllers/tps');

const upload = multer({
  dest: 'uploads/',
});

router.post('/upload', upload.single('file'), async (req, res, next) => {
  // 上传接口，接受前端上传的图片文件
  const file = req.file;
  console.log(req.file, req.body);
  const result = await uploadCloud(file);
  res.json(result);
});

router.get('/list', (req, res, next) => {
  const { pageNo, pageSize } = req.query;
  const result = getList(pageNo, pageSize);
  result.then((data) => {
    res.json(data);
  });
});

module.exports = router;
