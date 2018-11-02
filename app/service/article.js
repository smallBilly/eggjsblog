'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../utils/utils');

class ArticleService extends Service {
  async insert (article) {
    const { ctx } = this

    if (!article.userId) {
      return {
        ...ERROR,
        data: false,
        message: '请输入用户ID'
      }
    }

    const userDB = await ctx.model.User.findOne({
      where: {
        id: article.userId
      },
      attributes: ['id', 'username', 'updated_at']
    })

    if(!userDB){
      return {
        ...ERROR,
        data: false,
        message: '不存在该用户,无法添加文章'
      }
    }

    if(!article.title || !article.content){
      return {
        ...ERROR,
        data: false,
        message: `文章标题和内容为必填项,接收到的参数为${JSON.stringify(article)}`
      }
    }

    const res = await ctx.model.Article.create({
      ...article,
      user_id: article.userId
    })

    return {
      ...SUCCESS,
      data: res,
    }
  }

  async delete (article) {
    const { ctx } = this
    const id = article.id
    if(!id){
      return {
        ...ERROR,
        data: false,
        message: '请输入文章id'
      }
    }

    await ctx.model.Article.destroy({
      where: {
        id
      }
    })

    return {
      ...SUCCESS,
      data: true
    }
  }

  async findById (article) {
    const { ctx } = this
    const id = article.id
    if(!id){
      return {
        ...ERROR,
        data: false,
        message: '请输入文章id'
      }
    }

    const articleDB = await ctx.model.Article.findOne({
      where: {
        id
      }
    })

    if(!articleDB){
      return {
        ...ERROR,
        data: articleDB,
        message: '文章已删除'
      }
    }else{
      return {
        ...SUCCESS,
        data: articleDB
      }
    }
  }

  async findAndCountAll (params) {
    const { ctx } = this
    const index = params.index
    const size = params.size
    const list = await ctx.model.Article.findAndCountAll({
      offset: (index - 1) * size,
      limit: size
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

  async update (article, str) {
    const { ctx } = this
    const id = article.id

    if (!article.userId) {
      return {
        ...ERROR,
        data: false,
        message: '请输入userId'
      }
    }

    const articleDB = await ctx.model.Article.findOne({
      where: {
        id
      }
    })

    if(articleDB){
      if(articleDB.user_id !== article.userId){
        return {
          ...ERROR,
          data: false,
          message: '没有修改权限'
        }
      }
    }else{
      return {
        ...ERROR,
        data: '文章已删除'
      }
    }

    if(!id){
      return {
        ...ERROR,
        data: false,
        message: `请输入正确的文章id，接收到的值为：${JSON.stringify(article)}`
      }
    }

    await ctx.model.Article.update(
      { ...article },
      {
        where: { id }
      }
    )

    return {
      ...SUCCESS,
      data: true
    }
  }
}

module.exports = ArticleService;