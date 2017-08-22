const chai = require('chai');
const sinon = require("sinon");
const proxyquire = require('proxyquire').noCallThru();
const expect = chai.expect;
const { Request, Response } = require('../mocks/express.mock');

const Todo = {
  create: sinon.stub()
};
const controller = proxyquire('../../../controllers/todos/controller', {
  '../../models': { Todo }
});


describe('Todos controller', () => {
  const res = new Response();

  context('create', () => {
    const req = new Request(null, { title: 'test' });

    it('should create a todo successfully', async () => {
      Todo.create.withArgs({ title: 'test' }).returns({
        id: 1,
        title: 'test'
      });

      const response = await controller.create(req, res);
      expect(response.status).to.be.equal(201);
      expect(response.data.id).to.be.equal(1);
      expect(response.data.title).to.be.equal('test');
    });

    it('should failed to create a todo', async () => {
      Todo.create.throws();
      const response = await controller.create(null, res);
      expect(response.status).to.be.equal(400);
      expect(response.data).to.not.be.undefined;
    });
  });
});
