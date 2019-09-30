const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  // 用户id
  uid: { type: String, require: true },

  // 文章标题
  title: { type: String, require: true },

  // 文章内容
  content: { type: String, require: true },

  // 状态 {0: 待发布(草稿箱) 1: 已发布 2: 已删除(回收站) }
  status: { type: Number, default: 0 },

  // 浏览数量
  browseNum: { type: Number, default: 0 },

  // 点赞数量
  praiseNum: { type: Number, default: 0 },

  // 创建时间
  createTime: { type: Number, default: Date.now },

  // 修改时间
  modifyTime: { type: Number, default: Date.now }
})

const article = mongoose.model('article', articleSchema)

module.exports = article