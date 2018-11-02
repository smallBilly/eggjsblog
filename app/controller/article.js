'use strict';

const Controller = require('egg').Controller

class ArticleController extends Controller {
  async insert () {
    const { ctx } = this
    const body = ctx.request.body
    const res = await ctx.service.article.insert(body)
    ctx.body = res
  }

  async delete () {
    const { ctx } = this
    const id = ctx.request.body.id
    const res = await ctx.service.article.delete({ id })
    ctx.body = res
  }

  async find () {
    const { ctx } = this
    const id = ctx.request.query.id
    const res = await ctx.service.article.findById({ id })
    ctx.body = res
  }

  async update () {
    const { ctx } = this
    const body = ctx.request.body
    const res = await ctx.service.article.update(body)
    ctx.body = res
  }

  async list () {
    const { ctx } = this
    const index = parseInt(ctx.request.query._index)
    const size = parseInt(ctx.request.query._size)
    const res = await ctx.service.article.findAndCountAll({
      index,
      size
    })
    ctx.body = res
  }
}

module.exports = ArticleController