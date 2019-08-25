const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const config = require('../config/default')
const cryptoMd5 = require('../util/crypto').cryptoMd5

class User {
  async register (req, res) {
    try {
      if (!req.body.username) {
        throw new Error('\'username\' is missing.');
      }
      if (!req.body.password) {
        throw new Error('\'password\' is missing.');
      }
      const result = await userModel.find({ username: req.body.username })
      if (result) {
        res.json({ code: 1004, msg: '用户已存在', data: null })
      } else {
        let data = req.body
        const password = cryptoMd5(req.body.password)
        data.password = password
        await userModel(data).save()
        res.json({ code: 200, msg: '注册成功', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '注册失败, 请稍后重试', data: null })
    }
  }

  async login (req, res) {
    try {
      if (!req.body.username) {
        throw new Error('\'username\' is missing.');
      }
      if (!req.body.password) {
        throw new Error('\'password\' is missing.');
      }
      const password = cryptoMd5(req.body.password)
      const result = await userModel.findOne({ username: req.body.username, password })
      if (result) {
        const token = jwt.sign(req.body, config.token.secret, config.token.options)
        res.json({ code: 200, msg: '登录成功', data: result, token })
      } else {
        res.json({ code: 1003, msg: '用户名或密码错误', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '登录失败, 请稍后重试', data: null })
    }
  }

  async verifyUserName (req, res) {
    try {
      if (!req.body.username) {
        throw new Error('\'username\' is missing.');
      }
      const result = await userModel.find({ username: req.body.username })
      if (result) {
        res.json({ code: 1004, msg: '用户名已注册', data: null })
      } else {
        res.json({ code: 200, msg: '用户名未注册', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '未知错误', data: null })
    }
  }

  async verifyPhone (req, res) {
    try {
      if (!req.body.phone) {
        throw new Error('\'phone\' is missing.');
      }
      const result = await userModel.find({ phone: req.body.phone })
      if (result) {
        res.json({ code: 1004, msg: '手机号已注册', data: null })
      } else {
        res.json({ code: 200, msg: '手机号未注册', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '未知错误', data: null })
    }
  }

  async verifyEmail (req, res) {
    try {
      if (!req.body.email) {
        throw new Error('\'email\' is missing.');
      }
      const result = await userModel.find({ email: req.body.email })
      if (result) {
        res.json({ code: 1004, msg: '邮箱已注册', data: null })
      } else {
        res.json({ code: 200, msg: '邮箱未注册', data: null })
      }
    } catch (error) {
      res.json({ code: 1000, msg: error.message ? error.message : '未知错误', data: null })
    }
  }
}

module.exports = new User()