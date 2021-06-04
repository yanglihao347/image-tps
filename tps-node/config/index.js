const qiniuSecret = require('./qiniuSecret');
const aliyunSecret = require('./aliyunSecret');
const { MYSQL_CONF } = require('./mysql');

const link = 'http://test-cdn.yanglihao.cn/';

module.exports = {
  link,
  ...qiniuSecret,
  ...aliyunSecret,
  MYSQL_CONF,
};
