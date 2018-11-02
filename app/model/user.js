'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      // validate: { max: 6 }
    },
    password: {
      type: STRING,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Article, {
      as: 'articles',
    });
    // app.model.User.hasMany(app.model.Catalog, {
    //   as: 'catalogs',
    // });
    // app.model.User.hasMany(app.model.Comment, {
    //   as: 'comments',
    // });
    // app.model.User.belongsTo(app.model.Authority);
  };

  return User;
};