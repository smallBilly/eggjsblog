'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const version = app.config.version
  const checktoken = app.middleware.checktoken()

  router.get('/', controller.home.index)

  // 用户接口
  router.post(`/api/${version}/user/login`, controller.user.login)
  router.post(`/api/${version}/user/insert`, checktoken, controller.user.insert)
  router.post(`/api/${version}/user/delete`, checktoken, controller.user.delete)
  router.get(`/api/${version}/user/find`, checktoken, controller.user.find)
  router.post(`/api/${version}/user/update`, checktoken, controller.user.update)
  router.get(`/api/${version}/user/list`, checktoken, controller.user.list)

  // 文章接口
  router.post(`/api/${version}/article/insert`, checktoken, controller.article.insert)
  router.post(`/api/${version}/article/delete`, checktoken, controller.article.delete)
  router.get(`/api/${version}/article/find`, checktoken, controller.article.find)
  router.post(`/api/${version}/article/update`, checktoken, controller.article.update)
  router.get(`/api/${version}/article/list`, checktoken, controller.article.list)

  // 角色接口
  router.post(`/api/${version}/role/insert`, checktoken, controller.role.insert)
  router.post(`/api/${version}/role/delete`, checktoken, controller.role.delete)
  router.get(`/api/${version}/role/find`, checktoken, controller.role.find)
  router.post(`/api/${version}/role/update`, checktoken, controller.role.update)
  router.get(`/api/${version}/role/list`, checktoken, controller.role.list)

  // 菜单接口
  router.post(`/api/${version}/menu/insert`, checktoken, controller.menu.insert)
  router.post(`/api/${version}/menu/delete`, checktoken, controller.menu.delete)
  router.get(`/api/${version}/menu/find`, checktoken, controller.menu.find)
  router.post(`/api/${version}/menu/update`, checktoken, controller.menu.update)
  router.get(`/api/${version}/menu/list`, checktoken, controller.menu.list)
  router.get(`/api/${version}/menu/tree`, checktoken, controller.menu.tree)

  // // app/controller/v1/users.js
  // router.resources('users', '/api/v1/users', controller.v1.users);
}