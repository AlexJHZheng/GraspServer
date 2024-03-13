# GraspServer

app 是入口文件

router 文件夹存放路由
1.graspRouter 中是查询库存相关接口

在 config 文件夹下的 dbConfig.json 是用来存储数据库连接信息，需要在本地配置
{
"dbgrasp": {
"host": "localhost",
"port": 27017,
"username": "user1",
"password": "password1",
"database": "database1"
},
"dblogin": {
"host": "localhost",
"port": 5432,
"username": "user2",
"password": "password2",
"database": "database2"
}
}
