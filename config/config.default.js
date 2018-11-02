'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520690141955_3949';

  config.version = 'v1'

  // add your config here
  config.middleware = [];
  // config.middleware = ['checktoken'];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'blog',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [ 'http://119.29.151.195' ],
  };

  // config.cors = {
  //   credentials: true,
  // };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  

  // config.alinode = {
  //   enable: true,
  //   appid: 'your appid',
  //   secret: 'your secret',
  // };

  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  config.jwt = {
    enable: false,
    secret: "654321"
  };

  return config;
};