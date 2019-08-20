const captcha = require('../controllers/captcha')
const user = require('../controllers/user')
const router = require('express').Router()

router.get('/', async (req, res) => {
  res.json({ "blog-api": "Hello World!" })
})

// 验证码相关api
router.get('/captcha/getCaptcha', captcha.getCatcha)

// 用户相关api
router.get('/user/login', user.login)

module.exports = router