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

async function update(req, res) {
  try {
    const item = Item.find({
      where: {
        id: req.params.itemId,
        todoId: req.params.todoId
      }
    });
    if (!item) return res.status(404).send({
      message: 'Item Not Found'
    });
    const newItem = item.update(req.body, { fields: Object.keys(req.body) });
    return res.status(200).send(newItem);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function destroy(req, res) {
  try {
    const item = Item.find({
      where: {
        id: req.params.itemId,
        todoId: req.params.todoId
      }
    });
    if (!item) return res.status(404).send({
      message: 'Item Not Found'
    });
    await item.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  create,
  update,
  destroy
};
