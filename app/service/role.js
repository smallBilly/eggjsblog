'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5')
const {
  ERROR,
  SUCCESS,
} = require('../utils/utils');

class RoleService extends Service {
  async insert (role) {
    const { ctx } = this
    const name = role.name

    if (!name) {
      return {
        ...ERROR,
        data: false,
        message: `角色名称为必填项,接收到的参数为${JSON.stringify(role)}`
      }
    }

    const roleDB = await ctx.model.Role.findOne({
      where: {
        name
      }
    })

    if (roleDB) {
      return {
        ...ERROR,
        data: false,
        message: `角色已存在，无需重复创建`
      }
    } else {
      const res = await ctx.model.Role.create({
        ...role
      })

      return {
        ...SUCCESS,
        data: res,
      }
    }
  }

  async delete (role) {
    const { ctx } = this
    const id = role.id
    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: '请输入角色id'
      }
    }

    const roleDB = await ctx.model.Role.findOne({
      where: {
        id
      }
    })

    if (roleDB) {
      if (roleDB.lock === 1) {
        return {
          ...ERROR,
          data: false,
          message: `角色已锁定，无法删除`
        }
      }
    } else {
      return {
        ...ERROR,
        data: false,
        message: `角色不存在`
      }
    }

    await ctx.model.Role.destroy({
      where: {
        id
      }
    })

    return {
      ...SUCCESS,
      data: true
    }
  }

  async findById (role) {
    const { ctx } = this
    const id = role.id
    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: '请输入角色id'
      }
    }

    const roleDB = await ctx.model.Role.findOne({
      where: {
        id
      }
    })

    if (!roleDB) {
      return {
        ...ERROR,
        data: roleDB,
        message: '角色已删除'
      }
    } else {
      return {
        ...SUCCESS,
        data: roleDB
      }
    }
  }

  async findAll () {
    const { ctx } = this
    const list = await ctx.model.Role.findAll({})
    return {
      ...SUCCESS,
      data: list
    }
  }

  async update (role) {
    const { ctx } = this
    const id = role.id
    const name = role.name

    if (!id) {
      return {
        ...ERROR,
        data: false,
        message: `请输入角色id，接收到的值为：${JSON.stringify(role)}`
      }
    }

    if (name) {
      const roleDB1 = await ctx.model.Role.findOne({
        where: {
          name
        }
      })
      if (roleDB1) {
        return {
          ...ERROR,
          data: false,
          message: `角色名已存在，请修改角色名称`
        }
      }
    }

    const roleDB2 = await ctx.model.Role.findOne({
      where: {
        id
      }
    })

    if (roleDB2) {
      // if (roleDB2.lock === 1) {
      //   return {
      //     ...ERROR,
      //     data: false,
      //     message: `角色已锁定，无法修改`
      //   }
      // }
    } else {
      return {
        ...ERROR,
        data: false,
        message: `角色不存在`
      }
    }

    await ctx.model.Role.update(
      { ...role },
      {
        where: { id }
      }
    )

    return {
      ...SUCCESS,
      data: true
    }
  }

  // 查找用户角色，并返回用户能浏览的菜单
  async findRoleWithMenu () {
    
  }
}

module.exports = RoleService;