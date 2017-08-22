module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING
  });

  Todo.associate = (models) => {
    Todo.hasMany(models.Item, { foreignKey: 'todoId' });
  };

  return Todo;
};
