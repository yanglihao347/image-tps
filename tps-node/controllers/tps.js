const OSS = require('ali-oss');
const sizeof = require('image-size');
const path = require('path');
const fs = require('fs');
const { accessKeyId, accessKeySecret, link } = require('../config/index');

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId,
  accessKeySecret,
});

const getList = (pageNo, pageSize) => {
  client.useBucket('test002-0906');

  return new Promise((resolve, reject) => {
    client
      .list({
        'max-keys': 5,
      })
      .then((result) => {
        resolve({
          data: result,
        });
      });
  });
};

const uploadCloud = async (file) => {
  const { originalname, filename, size, mimetype } = file;
  fs.renameSync('uploads/' + filename, 'uploads/' + originalname);
  const localFile = path.normalize('./uploads/' + originalname);
  const filebody = await sizeof(localFile);
  const { width, height } = filebody;
  client.useBucket('test002-0906');
  const result = await client.put(`${filename}-${width}-${height}.${mimetype.split('/')[1]}`, localFile);
  const { url } = result;
  console.log(result);
  return {
    width,
    height,
    url,
    size,
    mimetype,
    originalname
  };
};

module.exports = {
  uploadCloud,
  getList,
};
