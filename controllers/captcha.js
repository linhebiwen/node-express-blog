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
      height: 30
    })
    res.cookie('captcha', captcha.text.toLowerCase(), { maxAge: 300000, httpOnly: true })
    res.write(String(captcha.data))
    res.end()
  }
}

module.exports = new Captcha()