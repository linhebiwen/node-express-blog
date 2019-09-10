const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  // 用户id
  id: { type: Number, require: true },

  // 用户名
  username: { type: String, require: true },

  // 昵称
  nickname: { type: String, require: true },

  // 密码
  password: { type: String, require: true },

  // 手机号
  phone: { type: String, require: false },

  // 邮箱
  email: { type: String, require: false },

  // 生日
  birthday: { type: String, require: false },

  // 性别
  sex: { type: Number, default: 0 },

  // 创建时间
  createTime: { type: Number, default: Date.now },

  // 修改时间
  modifyTime: { type: Number, default: Date.now }
})

const user = mongoose.model('user', userSchema)

module.exports = user