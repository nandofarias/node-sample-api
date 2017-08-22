const chai = require('chai');
const sinon = require("sinon");
const proxyquire = require('proxyquire').noCallThru();
const expect = chai.expect;
const { Request, Response } = require('../mocks/express.mock');

const Todo = {
  create: sinon.stub(),
  findAll: sinon.stub(),
  findById: sinon.stub()
};
const controller = proxyquire('../../../controllers/todos/controller', {
  '../../models': { Todo }
});


describe('Todos controller', () => {
  const res = new Response();

  context('create', () => {
    it('should create a todo successfully', async () => {
      const req = new Request(null, { title: 'test' });

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
    });
  });

  context('list', () => {
    it('should list all todos', async () => {
      const req = new Request();

      Todo.findAll.returns([
      	{
      		id: 1,
      		title: 'Mozart',
      		createdAt: '2017-08-22T13:26:14.346Z',
      		updatedAt: '2017-08-22T13:26:14.346Z',
      		Items: [
      			{
      				id: 7,
      				content: 'Mozart',
      				createdAt: '2017-08-22T14:07:07.899Z',
      				updatedAt: '2017-08-22T14:07:07.899Z',
      				todoId: 1
      			}
      		]
      	}
      ]);
      const response = await controller.list(req, res);
      expect(response.status).to.be.equal(200);
      expect(response.data[0].id).to.be.equal(1);
      expect(response.data[0].title).to.be.equal('Mozart');
      expect(response.data[0].createdAt).to.be.equal('2017-08-22T13:26:14.346Z');
      expect(response.data[0].updatedAt).to.be.equal('2017-08-22T13:26:14.346Z');
      expect(response.data[0].Items.length).to.be.equal(1);
    });

    it('should failed when return todos', async () => {
      Todo.findAll.throws();
      const response = await controller.list(null, res);
      expect(response.status).to.be.equal(400);
    });
  });

  context('find one', () => {
    it('should find the specific todo', async () => {
      const req = new Request({ todoId: 1});

      Todo.findById.withArgs(1).returns({
        id: 1,
        title: 'Mozart',
        createdAt: '2017-08-22T13:26:14.346Z',
        updatedAt: '2017-08-22T13:26:14.346Z',
        Items: [
          {
            id: 7,
            content: 'Mozart',
            createdAt: '2017-08-22T14:07:07.899Z',
            updatedAt: '2017-08-22T14:07:07.899Z',
            todoId: 1
          }
        ]
      });
      const response = await controller.findOne(req, res);
      expect(response.status).to.be.equal(200);
      expect(response.data.id).to.be.equal(1);
      expect(response.data.title).to.be.equal('Mozart');
      expect(response.data.createdAt).to.be.equal('2017-08-22T13:26:14.346Z');
      expect(response.data.updatedAt).to.be.equal('2017-08-22T13:26:14.346Z');
      expect(response.data.Items.length).to.be.equal(1);
    });

    it('should return 404 when not found an specific todo', async () => {
      const req = new Request({ todoId: 1});

      Todo.findById.withArgs(1).returns(null);

      const response = await controller.findOne(req, res);
      expect(response.status).to.be.equal(404);
      expect(response.data.message).to.match(/Todo Not Found/);
    });

    it('should failed when return an specific todo', async () => {
      Todo.findById.throws();

      const response = await controller.findOne(null, res);
      expect(response.status).to.be.equal(400);
    });
  });
});
