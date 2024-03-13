const Koa = require("koa");
const Router = require("koa-router");
// bodyParser是一个中间件，用于解析http请求体中的内容
const bodyParser = require("koa-bodyparser");
// 引入graspRouter
const graspRouter = require("./router/graspRouter");
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 创建一个Router对象表示web app的路由:
const router = new Router();

// 使用中间件
graspRouter(router);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => {
  //调用createConnect方法
  //const res = createConnect()
  console.log("接口已启动,端口3000，访问地址：http://localhost:3000/");
});
