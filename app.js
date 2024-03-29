const Koa = require("koa");
// CORS跨域中间件
const cors = require("koa-cors");
const Router = require("koa-router");
// bodyParser是一个中间件，用于解析http请求体中的内容
const bodyParser = require("koa-bodyparser");
// 引入graspRouter
const graspRouter = require("./router/graspRouter");
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 创建一个Router对象表示web app的路由:
const router = new Router();
// 引入jsonwebtoken
const jwt = require("jsonwebtoken");
const koaJwt = require("koa-jwt");
// 引入secret
const { secret } = require("./config/secret");

// 使用中间件
graspRouter(router);

// 使用 CORS 中间件
app.use(cors());

// 加密登陆错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});

// 使用koaJwt中间件保护路由
// 除了/login接口，其他接口都需要token
// 使用koaJwt中间件保护路由
// 除了/login接口和/verifyToken接口，其他接口都需要token
app.use(
  koaJwt({ secret: secret }).unless({
    path: [/^\/userlogin/, /^\/verifyToken/],
  })
);

// 使用中间件
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3333, () => {
  //调用createConnect方法
  //const res = createConnect()
  console.log("接口已启动,端口3333，访问地址：http://localhost:3333/");
});
