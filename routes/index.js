const jwt = require('jsonwebtoken')
const captcha = require('../controllers/captcha')
const user = require('../controllers/user')
const router = require('express').Router()
const config = require('../config/default')

router.get('/', async (req, res) => {
  res.json({ "blog-api": "Hello World!" })
})

// 路由中间件
router.use((req, res, next) => {
  // 任何路由信息都会执行这里面的语句
  if (req.url !== '/user/login' && req.url !== '/user/register') {
    if (req.headers.token) {
      jwt.verify(req.headers.token, config.token.secret, (error, result) => {
        if (error) {
          res.json({ code: 1002, msg: 'token不合法', data: null })
        } else {
          // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
          next()
        }
      })
    } else {
      res.json({ code: 1001, msg: 'token不存在', data: null })
    }
  }
})

// 验证码相关api
router.get('/captcha/getCaptcha', captcha.getCatcha)

// 用户相关api
router.post('/user/login', user.login)

module.exports = router