const sql = require("mssql");
//引入config/dbConfig.json文件，并获取其中数据库
const dblogin = require("../config/dbConfig.json").dblogin;

//连接数据库
console.log(dblogin, "dblogin");

// login功能, 通过用户名和密码登录
async function login(username, password) {
  const pool = await sql.connect(dblogin);
  //调用数据库
  const result = await pool
    .request()
    .input("username", sql.NVarChar, username)
    .input("password", sql.NVarChar, password)
    .query(
      "select * from [Users] where User_name = @username and User_password = @password"
    );
  //如果查询结果等于1，返回true，否则返回false
  if (result.recordset.length === 1) {
    return true;
  }
  return false;
}

//导出功能;
module.exports = {
  login,
};
