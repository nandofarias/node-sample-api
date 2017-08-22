const chai = require('chai');
const expect = chai.expect;
const { Todo } = require('../../../models');
const Sequelize = require('sequelize');

describe('Todo', () => {
  context('should create', () => {
    it('a new todo successfully', () => {
      const todo = new Todo({
        id: 1,
        title: 'testing',
        notAProperty: 'not a property'
      });
      expect(todo.id).to.be.equal(1);
      expect(todo.title).to.be.equal('testing');
      expect(todo.notAProperty).to.be.undefined;
    });
  });
});
