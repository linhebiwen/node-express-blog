/*
 * @Description: crypto加解密算法
 * @Author: LinXianChong
 * @Date: 2019-08-16 17:31:09
 * @LastEditTime: 2019-08-25 14:54:30
 * @LastEditors: LinXianChong
 */
const crypto = require('crypto')

/**
 * @description: md5加密算法
 * @param {String} plaintext: 明文
 * @return: 加密后的密文
 */
exports.cryptoMd5 = (plaintext) => {
  const md5 = crypto.createHash('md5')
  return md5.update(plaintext).digest('hex')
}

/**
 * @description: sha1加密算法
 * @param {String} plaintext: 明文
 * @return: 加密后的密文
 */
const cryptoSha1 = (plaintext) => {
  const sha1 = crypto.createHash('sha1')
  return sha1.update(plaintext).digest('hex')
}

/**
 * @description: sha256加密算法
 * @param {String} plaintext: 明文
 * @return: 加密后的密文
 */
const cryptoSha256 = (plaintext) => {
  const sha256 = crypto.createHash('sha256')
  return sha256.update(plaintext).digest('hex')
}

/**
 * @description: sha512加密算法
 * @param {String} plaintext: 明文
 * @return: 加密后的密文
 */
const cryptoSha512 = (plaintext) => {
  const sha512 = crypto.createHash('sha512')
  return sha512.update(plaintext).digest('hex')
}

/**
 * @description: hmac加密，结合md5,sha1等哈希算法
 * @param {String, String, String} plaintext: 明文, type: md5, sha1, sha256, sha512等, key: 密钥
 * @return: 加密后的密文
 */
const cryptoHmac = (plaintext, type, key) => {
  const hmac = crypto.createHmac(type, key)
  return hmac.update(plaintext).digest('hex')
}

// AES对称加密算法

/**
 * @description: AES加密算法
 * @param {String, String, String} plaintext: 明文, type: aes192、aes-128-ecb、aes-256-cbc等, key: 密钥
 * @return: 加密后的密文
 */
const aesEncrypt = (plaintext, type, key) => {
  const cipher = crypto.createCipher(type, key)
  let crypted = cipher.update(plaintext, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

/**
 * @description: AES加密算法
 * @param {String, String, String} encrypted: 密文, type: aes192、aes-128-ecb、aes-256-cbc等, key: 密钥
 * @return: 解密后的明文
 */
const aesDecrypt = (encrypted, type, key) => {
  const decipher = crypto.createDecipher(type, key)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('hex')
  return decrypted
}