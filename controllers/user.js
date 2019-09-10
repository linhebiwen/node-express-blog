const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const config = require('../config/default')
const cryptoMd5 = require('../util/crypto').cryptoMd5

class User {
  async register (req, res) {
    try {
      if (!req.body.username) {
        throw new Error('\'username\' is missing.')
      }
      if (!req.body.password) {
        throw new Error('\'password\' is missing.')
      }
      if (!req.body.captcha) {
        throw new Error('\'captcha\' is missing.')
      }
      const captcha = req.session.captcha
      if (!captcha || captcha.toLowerCase() !== req.body.captcha.toLowerCase()) {
        res.json({ code: 1003, msg: '验证码错误', data: null })
      } else {
        let result = []
        result = await userModel.find({ username: req.body.username })
        if (result.length > 0) {
          res.json({ code: 1004, msg: '用户已存在', data: null })
        } else {
          let data = req.body
          const password = cryptoMd5(req.body.password)
          data.password = password
          res.json({ code: 0, msg: '注册成功', data: await userModel(data).save() })
        }
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '注册失败, 请稍后重试', data: null })
    }
  }

  async login (req, res) {
    try {
      if (!req.body.username) {
        throw new Error('\'username\' is missing.')
      }
      if (!req.body.password) {
        throw new Error('\'password\' is missing.')
      }
      if (!req.body.captcha) {
        throw new Error('\'captcha\' is missing.')
      }
      const captcha = req.session.captcha
      if (!captcha || captcha.toLowerCase() !== req.body.captcha.toLowerCase()) {
        res.json({ code: 1003, msg: '验证码错误', data: null })
      } else {
        const password = cryptoMd5(req.body.password)
        const result = await userModel.findOne({ username: req.body.username, password })
        if (result) {
          const token = jwt.sign(req.body, config.token.secret, config.token.options)
          if (req.body.autoLogin) {
            res.cookie('token', token, Object.assign({}, config.cookie, { maxAge: 1000 * 60 * 60 * 24 * 30 }))
          } else {
            res.cookie('token', token, config.cookie)
          }
          res.json({ code: 0, msg: '登录成功', data: result, token })
        } else {
          res.json({ code: 1003, msg: '用户名或密码错误', data: null })
        }
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '登录失败, 请稍后重试', data: null })
    }
  }

  async findAll (req, res) {
    try {
      result = { code: 0, data: await userModel.find({}).sort({ "createTime": -1 }) }
      res.json({ code: 0, msg: '查询成功', data: result })
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '查询失败', data: null })
    }
  }

  async update (req, res) {
    try {
      if (!req.body.uid) {
        throw new Error('\'uid\' is missing.')
      }
      const _id = mongoose.Types.ObjectId(req.body.uid)
      res.json({ code: 0, msg: '更新成功', data: await userModel.findByIdAndUpdate(_id) })
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '更新失败', data: null })
    }
  }

  async delete (req, res) {
    try {
      if (!req.body.uid) {
        throw new Error('\'uid\' is missing.')
      }
      const _id = mongoose.Types.ObjectId(req.body.uid)
      await userModel.deleteOne({ _id })
      res.json({ code: 0, msg: '删除成功', data: null })
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '删除失败', data: null })
    }
  }

  async verifyUserName (req, res) {
    try {
      if (!req.body.username) {
        throw new Error('\'username\' is missing.')
      }
      const result = await userModel.find({ username: req.body.username })
      if (result) {
        res.json({ code: 1004, msg: '用户名已注册', data: null })
      } else {
        res.json({ code: 0, msg: '用户名未注册', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '未知错误', data: null })
    }
  }

  async verifyPhone (req, res) {
    try {
      if (!req.body.phone) {
        throw new Error('\'phone\' is missing.')
      }
      const result = await userModel.find({ phone: req.body.phone })
      if (result) {
        res.json({ code: 1004, msg: '手机号已注册', data: null })
      } else {
        res.json({ code: 0, msg: '手机号未注册', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '未知错误', data: null })
    }
  }

  async verifyEmail (req, res) {
    try {
      if (!req.body.email) {
        throw new Error('\'email\' is missing.')
      }
      const result = await userModel.find({ email: req.body.email })
      if (result) {
        res.json({ code: 1004, msg: '邮箱已注册', data: null })
      } else {
        res.json({ code: 0, msg: '邮箱未注册', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '未知错误', data: null })
    }
  }
}

module.exports = new User()