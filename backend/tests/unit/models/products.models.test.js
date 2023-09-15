const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');
const productsMock = require('../mocks/products.mock');

// arrange
// act
// assert

chai.use(sinonChai);
const { expect } = chai;

describe('Products Model', function () {
  describe('List all products', function () {
    afterEach(sinon.restore);

    it('lists all products in the db', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([productsMock.products]);

      // act
      const products = await productModel.getAll();

      // assert
      expect(products).to.be.equal(productsMock.products);
    });
  });

  // describe('List products by id', function () {

  // });
});