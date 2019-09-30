const artcileModel = require('../models/article')

class Article {
  async search (req, res) {
    try {
      const reg = new RegExp(req.body.keyword, 'i') //不区分大小写
      let total = await articleModel.countDocuments(
        {
          $or: [ //多条件，数组
            { ticle: { $regex: reg } },
            { content: { $regex: reg } }
          ]
        }
      )
      let result = await articleModel.find(
        {
          $or: [ //多条件，数组
            { ticle: { $regex: reg } },
            { content: { $regex: reg } }
          ]
        }).sort({ creatTime: -1 }).skip((req.body.page - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
      res.json({ code: 0, msg: '查询成功', data: { userList: result, total: total } })
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '查询失败', data: null })
    }
  }
}

module.exports = new Article()