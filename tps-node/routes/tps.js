const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { uploadCloud, getList } = require('../controllers/tps');

const upload = multer({
  dest: 'uploads/',
})

router.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(req.file);
  fs.renameSync('uploads/' + file.filename, 'uploads/' + file.originalname);
  uploadCloud(file.originalname);
  res.json({
    ok: 1
  })
})

router.get('/list', (req, res, next) => {
  const { pageNo, pageSize } = req.query;
  const result = getList(pageNo, pageSize);
  result.then((data) => {
    res.json(data);
  })
})


module.exports = router;