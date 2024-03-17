const sql = require("mssql");
//引入config/dbConfig.json文件，并获取其中数据库
const dblogin = require("../config/dbConfig.json").dblogin;
//引入secret
const { secret } = require("../config/secret");
//连接数据库
const jwt = require("jsonwebtoken");
// console.log(dblogin, "dblogin");

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
  // 关闭数据库连接
  await pool.close();
  //如果查询结果等于1，返回true，否则返回false
  if (result.recordset.length === 1) {
    const payload = { username }; // 你可以添加更多的有效载荷（payload）信息
    const token = jwt.sign(payload, secret, { expiresIn: "24h" }); // 令牌有效期1小时
    return { login: true, token };
  }
  return { login: false, token: "" };
}

// 校验token是否有效，返回true或false和用户名
function verifyToken(token) {
  try {
    const result = jwt.verify(token, secret);
    return { valid: true, username: result.username };
  } catch (error) {
    return { valid: false, username: "" };
  }
}

//导出功能;
module.exports = {
  login,
  verifyToken,
};
