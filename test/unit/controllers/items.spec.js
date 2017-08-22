const chai = require('chai');
const sinon = require("sinon");
const proxyquire = require('proxyquire').noCallThru();
const expect = chai.expect;
const { Request, Response } = require('../mocks/express.mock');

const Item = {
  create: sinon.stub()
};
const controller = proxyquire('../../../controllers/todos/items/controller', {
  '../../../models': { Item }
});


describe('Items controller', () => {
  const res = new Response();

  context('create', () => {
    const req = new Request({ todoId: 1 }, { content: 'test' });

    it('should create an item successfully', async () => {
      Item.create.withArgs({ content: 'test', todoId: 1 }).returns({
        id: 1,
        content: 'test'
      });

      const response = await controller.create(req, res);
      expect(response.status).to.be.equal(201);
      expect(response.data.id).to.be.equal(1);
      expect(response.data.content).to.be.equal('test');
    });

    it('should failed to create an item', async () => {
      Item.create.throws();
      const response = await controller.create(null, res);
      expect(response.status).to.be.equal(400);
    });
  });
});
