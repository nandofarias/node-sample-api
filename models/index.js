const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map((file) => sequelize['import'](path.join(__dirname, file)));

const db = models.reduce((object, model) => {
  object[model.name] = model;
  return object;
}, {});

models.forEach((model) => model.associate && model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;