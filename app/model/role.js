'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    TEXT
  } = app.Sequelize;

  const Role = app.model.define('roles', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING
    },
    code: {
      type: STRING
    },
    lock: {
      type: INTEGER
    },
    created_at: DATE,
    updated_at: DATE,
    menuids: {
      type: STRING
    }
  });

  return Role;
};