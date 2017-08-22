const { Item } = require('../../../models');

async function create(req, res) {
  try {
    const item = await Item.create({
      content: req.body.content,
      todoId: req.params.todoId
    });
    return res.status(201).send(item);
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  create
};
