const todos = require('./todos');

module.exports = (app) => {
  app.use('/todos', todos);

  app.get('/', (req, res) => res.status(200).send({
   message: 'Welcome to the Todos API!',
  }));
}
