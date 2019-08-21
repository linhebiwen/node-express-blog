const svgCaptcha = require('svg-captcha')

class Captcha {
  async getCatcha (req, res) {
    const captcha = svgCaptcha.create({
      // 是否翻转颜色
      inverse: false,
      // 字体大小
      fontSize: 36,
      // 噪声线宽度
      noise: 2,
      // 验证码宽度
      width: 80,
      // 验证码高度
      height: 40,
      // 验证码的字符是否有颜色，默认没有，如果设置了背景，则默认有
      color: true,
      // 验证码背景颜色
      background: '#CDB38B'
    })
    res.json({ code: 200, data: captcha.data })
  }
}

module.exports = new Captcha()