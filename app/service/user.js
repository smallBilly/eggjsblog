'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5')
const {
  ERROR,
  SUCCESS,
} = require('../utils/utils');

class UserService extends Service {
  async insert (user) {
    const { ctx } = this
    if (!user.username || !user.password) {
      return {
        ...ERROR,
        data: false,
        message: `请输入正确的用户名或密码，服务端接收到的值为：${JSON.stringify(user)}`
      }
    }

    const userDB = await ctx.model.User.findOne({
      where: {
        username: user.username
      }
    })

    if (!userDB) {
      const res = await ctx.model.User.create({
        ...user,
        password: md5(user.password)
      });
      return {
        ...SUCCESS,
        data: res,
      }
    } else {
      return {
        ...ERROR,
        data: false,
        message: `已存在该用户`
      }
    }
  }

  async delete (user) {
    const { ctx } = this
    const id = user.id
    if (!id) {
      return {
        code: ERROR.code,
        data: false,
        message: '请输入用户id'
      }
    }

    await ctx.model.User.destroy({
      where: {
        id
      }
    })
    return {
      ...SUCCESS,
      data: true,
    }
  }

  async findById (user) {
    const { ctx } = this
    const id = user.id
    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: '请输入用户id'
      }
    }

    const userDB = await ctx.model.User.findOne({
      where: {
        id
      },
      attributes: ['id', 'username', 'updated_at']
    })

    if (!userDB) {
      return {
        ...ERROR,
        data: userDB,
        message: '用户已删除'
      }
    } else {
      return {
        ...SUCCESS,
        data: userDB
      }
    }
  }

  async findAndCountAll (params) {
    const { ctx } = this
    const index = params.index
    const size = params.size
    const list = await ctx.model.User.findAndCountAll({
      offset: (index - 1) * size,
      limit: size,
      attributes: ['id', 'username', 'updated_at']
    })
    return {
      ...SUCCESS,
      data: {
        ...list,
        current: index,
        size: size
      }
    }
  }

  async update (user) {
    const { ctx } = this
    const id = user.id
    const username = user.username
    if (!id || !username) {
      return {
        ...ERROR,
        data: false,
        message: `请输入正确的用户名id或用户名，服务端接收到的值为：${JSON.stringify(user)}`
      }
    }

    const result = await ctx.model.User.update(
      { username },
      {
        where: { id }
      }
    )

    if (result[0] <= 0) {
      return {
        ...ERROR,
        data: '用户已删除'
      }
    } else {
      return {
        ...SUCCESS,
        data: true
      }
    }
  }

  async login ({ username, password }) {
    const { ctx } = this

    const user = await ctx.model.User.findOne({
      where: {
        username: username.toString()
      }
    })

    if (!user) {
      return {
        ...ERROR,
        data: '用户名或密码错误'
      }
    }

    if (md5(password) === user.password) {
      // const token = md5.hex(username + user.password)
      const token = await ctx.service.user.createToken({ id: user.id, username: username })
      return {
        ...SUCCESS,
        data: user,
        token
      }
    } else {
      return {
        ...ERROR,
        data: '用户名或密码错误'
      }
    }
  }

  // 创建token
  async createToken (data) {
    const { app } = this
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: "6h"
      // expiresIn: "60s"
      // expiresIn: "120s"
    })
  }

  // 验证token的合法性
  async verifyToken (token) {
    const { app } = this
    return new Promise((resolve, reject) => {
      app.jwt.verify(token, app.config.jwt.secret, function (err, decoded) {
        let result = {};
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          result.verify = false
          result.message = err.message
        } else {
          result.verify = true
          result.message = decoded
        }
        resolve(result)
      })
    })
  }
}

module.exports = UserService;