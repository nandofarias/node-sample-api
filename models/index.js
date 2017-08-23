const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);

const sequelize = new Sequelize(process.env.DATABASE_URI);

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
