'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    TEXT
  } = app.Sequelize;

  const Menu = app.model.define('menus', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING
    },
    url: {
      type: STRING
    },
    icon: {
      type: STRING
    },
    component: {
      type: STRING
    },
    order_num: {
      type: INTEGER
    },
    created_at: DATE,
    updated_at: DATE,
    parent_id: {
      type: INTEGER
    },
    parent_name: {
      type: STRING
    }
  });

  return Menu;
};