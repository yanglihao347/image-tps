const { escape, exec } = require('../mysql/index');
const { genPassword } = require('../utils/cryp');

const login = async (username, password) => {
  username = escape(username);
  password = genPassword(password);
  password = escape(password);
  const sql = `select username from users_table where username=${username} and passwd=${password};`;
  const result = await exec(sql);
  return result[0] || {};
}

module.exports = {
  login
}