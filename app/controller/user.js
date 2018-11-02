'use strict';

const Controller = require('egg').Controller;
const md5 = require('js-md5')

class UserController extends Controller {
  async insert () {
    const { ctx } = this
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const res = await ctx.service.user.insert({
      username,
      password
    })

    ctx.body = res
  }

  async delete () {
    const { ctx } = this
    const id = ctx.request.body.id
    const res = await ctx.service.user.delete({ id })
    ctx.body = res
  }

  async find () {
    const { ctx } = this
    const id = this.ctx.request.query.id
    const res = await ctx.service.user.findById({ id })
    ctx.body = res
  }

  async update () {
    const { ctx } = this
    const id = ctx.request.body.id
    const username = ctx.request.body.username
    const res = await ctx.service.user.update({
      id,
      username
    })
    ctx.body = res
  }

  async list () {
    const { ctx } = this
    const index = parseInt(ctx.request.query._index)
    const size = parseInt(ctx.request.query._size)
    const res = await ctx.service.user.findAndCountAll({
      index,
      size
    })
    ctx.body = res
  }

  async login () {
    const { ctx } = this
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const res = await ctx.service.user.login({
      username,
      password
    })
    ctx.body = res
  }
}

module.exports = UserController;
