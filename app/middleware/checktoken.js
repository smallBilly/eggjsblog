
const {
  ERROR,
  SUCCESS,
} = require('../utils/utils')

module.exports = options => {
  return async function checktoken (ctx, next) {
    const token = ctx.request.header.authorization
    if (token) {
      const verifyResult = await ctx.service.user.verifyToken(token)
      if (verifyResult.verify) {
        // 验证成功
        await next()
      } else {
        // 验证失败
        ctx.body = {
          ...ERROR,
          data: false,
          message: '登录失效，请重新登录'
        }
      }
    } else {
      // 请求没带token
      ctx.body = {
        ...ERROR,
        data: false,
        message: '请登录'
      }
    }
  }
}