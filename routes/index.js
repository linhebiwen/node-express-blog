const router = require('express').Router()

router.get('/', async (req, res) => {
  res.json({ "blog-api": "Hello World!" })
})

module.exports = router