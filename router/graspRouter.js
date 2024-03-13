// routes/users.js
module.exports = function (router) {
  //登陆接口
  router.get("/userlogin", async (ctx, next) => {
    ctx.body = "登陆接口";
  });
  //搜索产品接口-有限显示数量
  router.get("/searchLQTY", async (ctx, next) => {
    const id = ctx.params.id;
    ctx.body = `搜索产品接口`;
  });

  // 在这里可以继续添加更多用户相关的路由...
};
