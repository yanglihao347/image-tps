// 七牛云 调用方法备份，现转用阿里云oss

const qiniu = require('qiniu');
const { accessKey, secretKey, link } = require('../config/index');
// var accessKey = 'your access key';
// var secretKey = 'your secret key';

const getList = (pageNo, pageSize) => {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  //config.useHttpsDomain = true;
  config.zone = qiniu.zone.Zone_z0;
  var bucketManager = new qiniu.rs.BucketManager(mac, config);

  var bucket = 'ylh-test';
  var options = {
    limit: 1000,
    // marker: nextMarker,
    prefix: '',
  };

  return new Promise((resolve, reject) => {
    bucketManager.listPrefix(
      bucket,
      options,
      function (err, respBody, respInfo) {
        if (err) {
          console.log(err);
          throw err;
          reject(err);
        }
        if (respInfo.statusCode == 200) {
          //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
          //指定options里面的marker为这个值
          var nextMarker = respBody.marker;
          var commonPrefixes = respBody.commonPrefixes;
          console.log(nextMarker);
          console.log(commonPrefixes);
          var items = respBody.items;
          // 全量获取文件列表，根据时间倒序排序
          items.sort((a, b) => {
            if (a.putTime > b.putTime) {
              return -1;
            } else {
              return 1;
            }
          });

          // 遍历 给每项加上link值
          items.forEach(function (item, index) {
            if (index === 0) {
              console.log(item);
            }
            item.link = link + item.key;
            // console.log(item.putTime);
            // console.log(item.hash);
            // console.log(item.fsize);
            // console.log(item.mimeType);
            // console.log(item.endUser);
            // console.log(item.type);
          });

          // 根据pageNo pageSize计算出前端需要的数据

          resolve({
            data: items.slice((pageNo - 1) * pageSize, pageNo * pageSize),
            total: items.length,
          });
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          resolve(respInfo);
        }
      }
    );
  });
};

const uploadCloud = (filename) => {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var options = {
    scope: 'ylh-test',
    expires: 3600,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);

  console.log(uploadToken);

  var config = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z0;

  // var localFile = "E:/server/express-blog/test.txt";
  const localFile = './uploads/' + filename;
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  var key = filename;

  formUploader.putFile(
    uploadToken,
    key,
    localFile,
    putExtra,
    function (respErr, respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    }
  );
};

module.exports = {
  uploadCloud,
  getList,
};
