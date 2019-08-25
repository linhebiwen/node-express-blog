const express = require('express')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const mongoose = require('./mongoose').mongoose

const app = express()

// 添加session会话
const mongoStore = connectMongo(session)
app.use(session({
  ...config.session,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}))