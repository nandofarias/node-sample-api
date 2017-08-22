module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    content: DataTypes.STRING
  });

  Item.associate = (models) => {
    Item.belongsTo(models.Todo, { foreignKey: 'todoId', onDelete: 'CASCADE' });
  }
  return Item;
};
