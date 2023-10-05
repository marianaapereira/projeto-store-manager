const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const { saleErrors } = require('../mocks/sales.mock');

describe('Nos middlewares de sales', function () {
  afterEach(sinon.restore);

  it('a função valueIsUndefined faz a verificação correta em caso de valor undefined', function () {
    const value = undefined;
    const functionReturn = salesMiddlewares.valueIsUndefined(value);

    expect(functionReturn).to.equal(true);
  });

  it('a função valueIsUndefined faz a verificação correta em caso de valor null', function () {
    const value = null;
    const functionReturn = salesMiddlewares.valueIsUndefined(value);

    expect(functionReturn).to.equal(true);
  });

  it('a função valueIsUndefined faz a verificação correta em caso de valor válido', function () {
    const value = 10;
    const functionReturn = salesMiddlewares.valueIsUndefined(value);

    expect(functionReturn).to.equal(false);
  });

  it('a função productIdExistenceCheck faz as verificações corretas', function () {
    const productId = 10;

    expect(() => salesMiddlewares.productIdExistenceCheck(productId)).to.not.throw();
    expect(() => salesMiddlewares.productIdExistenceCheck()).to.throw(saleErrors.productIdIsRequired.message);
  });

  it('a função quantityExistenceCheck faz as verificações corretas', function () {
    const quantity = 10;

    expect(() => salesMiddlewares.quantityExistenceCheck(quantity)).to.not.throw();
    expect(() => salesMiddlewares.quantityExistenceCheck()).to.throw(saleErrors.quantityIsRequired.message);
  });

  it('a função quantityValueCheck faz as verificações corretas', function () {
    const validQuantity = 10;
    expect(() => salesMiddlewares.quantityValueCheck(validQuantity)).to.not.throw();

    const invalidQuantity = 0;
    expect(() => salesMiddlewares.quantityValueCheck(invalidQuantity)).to.throw(saleErrors.quantityMustBe.message);
  });
});
