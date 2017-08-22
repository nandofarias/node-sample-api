const chai = require('chai');
const expect = chai.expect;
const { Item } = require('../../../models');
const Sequelize = require('sequelize');

describe('Item', () => {
  context('should create', () => {
    it('a new item successfully', () => {
      const item = new Item({
        id: 1,
        content: 'testing',
        notAProperty: 'not a property'
      });
      expect(item.id).to.be.equal(1);
      expect(item.content).to.be.equal('testing');
      expect(item.notAProperty).to.be.undefined;
    });
  });
});
