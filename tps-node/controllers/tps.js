const OSS = require('ali-oss');
const sizeof = require('image-size');
const path = require('path');
const fs = require('fs');
const { exec } = require('../mysql/index');
const { accessKeyId, accessKeySecret, link } = require('../config/index');

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId,
  accessKeySecret,
});

const getList = async (pageNo, pageSize, username) => {
  client.useBucket('test002-0906');

  const totalSql = `select count(*) from images_table where upload_user='${username}';`;
  const listSql = `select * from images_table where upload_user='${username}' order by img_id desc limit ${pageSize} offset ${(pageNo - 1) * pageSize};`;

  const total = await exec(totalSql);
  const list = await exec(listSql);
  
  return {
    total: total[0]['count(*)'],
    list
  };
};

const uploadCloud = async (file, username) => {
  const { originalname, filename, size, mimetype } = file;
  fs.renameSync('uploads/' + filename, 'uploads/' + originalname);
  const localFile = path.normalize('./uploads/' + originalname);
  const filebody = await sizeof(localFile);
  const { width, height } = filebody;
  client.useBucket('test002-0906');
  const newName = `${filename}-${width}-${height}.${mimetype.split('/')[1]}`;
  const result = await client.put(newName, localFile);
  const { url } = result;
  const sql = `insert into images_table
  (img_url, file_name, original_name, upload_time, file_size, image_width, image_height, mimetype, upload_user)
  values
  ('${url}', '${newName}', '${originalname}', '${Date.now()}', ${size}, ${width}, ${height}, '${mimetype}', '${username}')`;
  const res = await exec(sql);
  console.log(res);
  return {
    width,
    height,
    url,
    size,
    mimetype,
    originalname,
    filename: newName
  };
};

module.exports = {
  uploadCloud,
  getList,
};
