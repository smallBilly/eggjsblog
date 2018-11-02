'use strict';

const Controller = require('egg').Controller

class RoleController extends Controller {
  async insert () {
    const { ctx } = this
    const body = ctx.request.body
    const res = await ctx.service.role.insert(body)
    ctx.body = res
  }

  async delete () {
    const { ctx } = this
    const id = ctx.request.body.id
    const res = await ctx.service.role.delete({ id })
    ctx.body = res
  }

  async find () {
    const { ctx } = this
    const id = ctx.request.query.id
    const res = await ctx.service.role.findById({ id })
    ctx.body = res
  }

  async update () {
    const { ctx } = this
    const body = ctx.request.body
    const res = await ctx.service.role.update(body)
    ctx.body = res
  }

  async list () {
    const { ctx } = this
    const res = await ctx.service.role.findAll()
    ctx.body = res
  }
}

module.exports = RoleController;
