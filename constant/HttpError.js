module.exports = {
  HTTP_DEFAULT_ERROR: new Map([
    [400, '请求参数错误'],
    [401, '请求要求用户的身份认证'],
    [403, '服务器拒绝执行此请求'],
    [404, '请求的资源无法找到'],
    [405, '请求中的方法被禁止'],
    [406, '服务器无法根据客户端请求的内容特性完成请求'],
    [407, '请求要求代理的身份认证'],
    [408, '请求超时'],
    [409, '请求存在冲突'],
    [410, '客户端请求的资源已经不存在'],
    [411, '服务器无法处理不带Content-Length的请求信息'],
    [412, '请求信息的先决条件错误'],
    [413, '请求的实体过大'],
    [414, '请求的URI过长'],
    [415, '无法处理请求附带的媒体格式'],
    [416, '无效的请求范围'],
    [417, '无法满足Expect的请求头信息'],
    [500, '服务器内部错误'],
    [501, '服务器不支持该请求功能'],
    [502, '请求失效'],
    [503, '服务器暂时的无法处理请求'],
    [504, '无法获取请求'],
    [505, 'http协议版本错误']
  ]),

  CUSTOM_ERROR: new Map([])
}