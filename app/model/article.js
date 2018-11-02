'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    TEXT
  } = app.Sequelize;

  const Article = app.model.define('articles', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: STRING
    },
    summary: {
      type: STRING
    },
    content: {
      type: TEXT
    },
    tags: {
      type: STRING
    },
    created_at: DATE,
    updated_at: DATE,
    user_id: {
      type: INTEGER
    }
  });

  return Article;
};