const userModel = require('../models/user')

class User {
  async create (req, res) {

  }

  async login (req, res) {
    if (!req.session.uid) {
      req.session.uid = "user"
      res.json({ msg: "第一次登录", session: req.session })
    } else {
      res.json({ msg: "第N次登录", session: req.session })
    }
  }
}

module.exports = new User()