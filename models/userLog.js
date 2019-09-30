const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  // 用户id
  uid: { type: Number, require: true },

  // 登录时间
  loginTime: { type: Number, default: Date.now },

  // 退出时间
  logoutTime: { type: Number, default: Date.now },

  // 登录ip地址
  loginIp: { type: String, require: false },

  // 登录mac地址
  loginMac: { type: String, require: false },

  // 描述
  description: { type: String, require: false }
})

const user = mongoose.model('user', userSchema)

module.exports = user