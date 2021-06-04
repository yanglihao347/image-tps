const OSS = require('ali-oss');
const path = require('path');
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

const uploadCloud = (filename) => {
  client.useBucket('test002-0906');
  const localFile = './uploads/' + filename;
  return new Promise((resolve, reject) => {
    // client.put(filename, path.normalize(localFile)).then((result) => {
    //   const { url } = result;
    //   resolve({
    //     data: result,
    //   });
    // });
    resolve({
      data: 1,
    });
  });
};

module.exports = {
  uploadCloud,
  getList,
};
