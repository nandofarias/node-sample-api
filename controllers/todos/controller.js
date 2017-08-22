const { Todo, Item } = require('../../models');

async function create(req, res) {
  try {
    const todo = await Todo.create({
      title: req.body.title
    });
    return res.status(201).send(todo);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function list(req, res) {
  try {
    const todos = await Todo.findAll({
      include: [{
        model: Item
      }]
    });
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function findOne(req, res) {
  try {
    const todo = await Todo.findById(req.params.todoId ,{
      include: [{
        model: Item
      }]
    });
    if (!todo) return res.status(404).send({
      message: 'Todo Not Found',
    });
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  create,
  list,
  findOne
};
