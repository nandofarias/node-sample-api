const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const proxyquire = require('proxyquire').noCallThru();
const expect = chai.expect;
chai.use(sinonChai);
const { Request, Response } = require('../mocks/express.mock');

const Item = {
  create: sinon.stub(),
  find: sinon.stub()
};
const controller = proxyquire('../../../controllers/todos/items/controller', {
  '../../../models': { Item }
});

const item = {
  id: 1,
  content: 'Mozart'
};


describe('Items controller', () => {
  const res = new Response();

  context('create', () => {
    const req = new Request({ todoId: 1 }, { content: 'Mozart' });

    it('should create an item successfully', async () => {
      Item.create.withArgs({ content: 'Mozart', todoId: 1 }).returns(item);

      const response = await controller.create(req, res);
      expect(response.status).to.be.equal(201);
      expect(response.data.id).to.be.equal(1);
      expect(response.data.content).to.be.equal('Mozart');
    });

    it('should failed to create an item', async () => {
      Item.create.throws();
      const response = await controller.create(null, res);
      expect(response.status).to.be.equal(400);
    });
  });

  context('update', () => {
    it('should update a item', async () => {
      const req = new Request({ itemId: 1, todoId: 1 }, { content: 'Bethoven' });

      Item.find.withArgs({ where: { id: 1, todoId: 1 } }).returns(item);
      item.update = sinon.spy();

      const response = await controller.update(req, res);
      expect(item.update).to.have.been.calledWith({ content: 'Bethoven' }, { fields: ['content'] });
      expect(response.status).to.be.equal(200);
    });

    it('should fail when not found a item for update', async () => {
      const req = new Request({ itemId: 1, todoId: 1 });

      Item.find.withArgs({ where: { id: 1, todoId: 1 } }).returns(null);

      const response = await controller.update(req, res);
      expect(response.status).to.be.equal(404);
      expect(response.data.message).to.match(/Item Not Found/);
    });

    it('should fail when update a item', async () => {
      Item.find.returns(item);
      item.update = sinon.stub().throws();

      const response = await controller.update(null, res);
      expect(response.status).to.be.equal(400);
    });
  });

  context('destroy', () => {
    it('should destroy a item', async () => {
      const req = new Request({ itemId: 1, todoId: 1 });

      Item.find.withArgs({ where: { id: 1, todoId: 1 } }).returns(item);
      item.destroy = sinon.spy();

      const response = await controller.destroy(req, res);
      expect(item.destroy).to.have.been.called;
      expect(response.status).to.be.equal(204);
    });

    it('should fail when not found a item for destroy', async () => {
      const req = new Request({ itemId: 1, todoId: 1 });

      Item.find.withArgs({ where: { id: 1, todoId: 1 } }).returns(null);

      const response = await controller.destroy(req, res);
      expect(response.status).to.be.equal(404);
      expect(response.data.message).to.match(/Item Not Found/);
    });

    it('should fail when destroy a item', async () => {
      Item.find.returns(item);
      item.destroy = sinon.stub().throws();

      const response = await controller.destroy(null, res);
      expect(response.status).to.be.equal(400);
    });
  });
});
