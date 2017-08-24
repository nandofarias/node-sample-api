const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;
const config = require('../config/config')[env];

const basename = path.basename(module.filename);

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const models = fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map(file => sequelize.import(path.join(__dirname, file)));

const db = models.reduce((object, model) => Object.assign(object, { [model.name]: model }), {});

models.forEach(model => model.associate && model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
