module.exports = {
  port: parseInt(process.env.PORT, 10) || 3001,
  mongodb: {
    url: 'mongodb://localhost:27017/blog',
    option: {
      useNewUrlParser: true
    }
  },
  session: {
    name: 'sid',   // 返回客户端的key的名称
    secret: Math.random().toString(36).slice(-8),  // session的签名
    resave: true,  // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存, 默认为true
    saveUninitialized: true,  // 初始化session时是否保存到存储, 默认为true
    cookie: {     // 返回到前端key的属性，默认值为{ path: '/', httpOnly: true, secure: false, maxAge: null }
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  }
}