// routes/users.js
// 引入login
const { login } = require("../services/serUser");
// 引入searchGraspProduto
const { searchGraspProduto } = require("../services/serGrasp");

module.exports = function (router) {
  //登陆接口
  router.post("/userlogin", async (ctx, next) => {
    //获取用户名和密码
    const { username, password } = ctx.request.body;
    //调用login方法
    const res = await login(username, password);
    //如果res为true，返回登陆成功，否则返回登陆失败
    if (res.login) {
      ctx.body = {
        code: 200,
        msg: "登陆成功LoginSucess",
        token: res.token,
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "登陆失败LoginFalha",
      };
    }
  });
  //搜索产品接口-有限显示数量
  router.post("/searchProdutos", async (ctx, next) => {
    const { pfullname } = ctx.request.body;
    // console.log(pfullname, "pfullnameRouter");
    //确认是否获取到pfullname，如果没有返回错误
    if (!pfullname) {
      ctx.body = {
        code: 400,
        msg: "请输入产品名称please input pfullname",
      };
      return;
    }
    //调用searchGraspProduto方法
    const res = await searchGraspProduto(pfullname);
    //返回查询结果
    ctx.body = {
      code: 200,
      data: res,
    };
  });

  // 在这里可以继续添加更多用户相关的路由...
};
