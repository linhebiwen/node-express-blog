const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes')
const cors = require('cors')
const config = require('./config/default')

// 连接数据库
require('./plugins/mongoose')

const app = express()

// cors跨域
app.use(cors())

// 解析传入的body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', route)

const server = app.listen(config.port, 'localhost', () => {
  const host = server.address().address
  const port = server.address().port
  console.log('server has started at http://%s:%s', host, port)
})