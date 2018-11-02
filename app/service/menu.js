'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../utils/utils');

class MenuService extends Service {
  async insert (menu) {
    const { ctx } = this
    const name = menu.name

    if (!name) {
      return {
        ...ERROR,
        data: false,
        message: `菜单名称为必填项,接收到的参数为${JSON.stringify(menu)}`
      }
    }

    const res = await ctx.model.Menu.create({
      ...menu
    })

    return {
      ...SUCCESS,
      data: res,
    }
  }

  async delete (menu) {
    const { ctx } = this
    const id = menu.id
    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: '请输入菜单id'
      }
    }

    await ctx.model.Menu.destroy({
      where: {
        id
      }
    })

    return {
      ...SUCCESS,
      data: true
    }
  }

  async findById (menu) {
    const { ctx } = this
    const id = menu.id
    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: '请输入菜单id'
      }
    }

    const menuDB = await ctx.model.Menu.findOne({
      where: {
        id
      }
    })

    if (!menuDB) {
      return {
        ...ERROR,
        data: menuDB,
        message: '菜单已删除'
      }
    } else {
      return {
        ...SUCCESS,
        data: menuDB
      }
    }
  }

  async findAllWithTree () {
    const { ctx } = this
    const { Sequelize } = this.app
    const Menu = ctx.model.Menu
    const list = await Menu.findAll({
      where: {
        parent_id: null
      },
      // include: [{
      //   model: Menu,
      //   where: { parent_id: Sequelize.col('menu.id') }
      // }]
    })
    return {
      ...SUCCESS,
      data: list
    }
  }

  async findAndCountAll (params) {
    const { ctx } = this
    const index = params.index
    const size = params.size
    const list = await ctx.model.Menu.findAndCountAll({
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

  async update (menu) {
    const { ctx } = this
    const id = menu.id
    const name = menu.name

    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: `请输入菜单那id，接收到的值为：${JSON.stringify(menu)}`
      }
    }

    const menuDB = await ctx.model.Menu.findOne({
      where: {
        id
      }
    })

    if (!menuDB) {
      return {
        ...ERROR,
        data: false,
        message: `菜单不存在`
      }
    }

    await ctx.model.Menu.update(
      { ...menu },
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

module.exports = MenuService;