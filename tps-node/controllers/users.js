const { escape, exec } = require('../mysql/index');
const { genPassword } = require('../utils/cryp');

const register = async (username, password) => {
  newUsername = escape(username);
  password = genPassword(password);
  console.log(password);
  password = escape(password);
  const sql1 = `select username from users_table where username=${newUsername}`;
  const row = await exec(sql1);
  if (row[0]) {
    return {};
  }
  const sql2 = `insert into users_table (username, passwd) values (${newUsername}, ${password});`;
  const result = await exec(sql2);
  console.log(result);
  return { username };
}

const login = async (username, password) => {
  username = escape(username);
  password = genPassword(password);
  console.log(password);
  password = escape(password);
  const sql = `select username from users_table where username=${username} and passwd=${password};`;
  const result = await exec(sql);
  return result[0] || {};
}

module.exports = {
  login,
  register
}