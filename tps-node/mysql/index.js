const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/index.js');

const pool = mysql.createPool(MYSQL_CONF);
const exec = (sql) => {
  const promise = new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
};

module.exports = {
  exec,
  escape: mysql.escape,
};
