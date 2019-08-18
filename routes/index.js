const user = require('../controllers/user')
const router = require('express').Router()

router.get('/', async (req, res) => {
  res.json({ "blog-api": "Hello World!" })
})

router.get('/user/login', user.login)

module.exports = router