const mongoose = require('mongoose')
const config = require('../config/default')
mongoose.Promise = global.Promise

const connect = (url, option) => {
  console.log("mongo connect: ", url);
  mongoose.connect(url, option)

  mongoose.connection.once('open', () => {
    console.log('连接数据库成功');
  })

  mongoose.connection.on('close', () => {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(url, option)
  })

  mongoose.connection.on('error', (error) => {
    console.log('', error);
  })

  return mongoose
}

connect(config.mongodb.url, config.mongodb.option)

exports.mongoose = mongoose