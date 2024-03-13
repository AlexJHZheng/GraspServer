// routes/users.js
// 引入login
const { login } = require("../services/serUser");

module.exports = function (router) {
  //登陆接口
  router.post("/userlogin", async (ctx, next) => {
    //获取用户名和密码
    const { username, password } = ctx.request.body;
    //调用login方法
    const res = await login(username, password);
    //如果res为true，返回登陆成功，否则返回登陆失败
    if (res) {
      ctx.body = {
        code: 200,
        msg: "登陆成功",
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "登陆失败",
      };
    }
  });
  //搜索产品接口-有限显示数量
  router.get("/searchLQTY", async (ctx, next) => {
    const id = ctx.params.id;
    ctx.body = `搜索产品接口`;
  });

  // 在这里可以继续添加更多用户相关的路由...
};
