const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const salesService = require('../../../src/services/sales.service');

const { saleErrors } = require('../mocks/sales.mock');

const { 
  HTTP_NOT_FOUND_STATUS,
} = require('../../../src/consts/httpStatusCodes');

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

    const validEqualQuantity = 1;
    expect(() => salesMiddlewares.quantityValueCheck(validEqualQuantity)).to.not.throw();

    const invalidQuantity = 0;
    expect(() => salesMiddlewares.quantityValueCheck(invalidQuantity)).to.throw(saleErrors.quantityMustBe.message);
  });

  it('a função productInSaleValidation retorna erro se não encontrar a venda', function (done) {
    sinon.stub(salesService, 'getById').resolves();
    
    const req = { params: { productId: 1, saleId: 0 } };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_NOT_FOUND_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({
          message: 'Sale not found',
        });
        done();
      },
    };

    salesMiddlewares.productInSaleValidation(req, res, () => {
      done();
    });
  });

  it('a função productInSaleValidation retorna erro se não encontrar o produto na venda', function (done) {
    const saleMock = [
      {
        date: '2023-10-05T19:43:20.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-10-05T19:43:20.000Z',
        productId: 2,
        quantity: 10,
      },
    ];
    
    sinon.stub(salesService, 'getById').resolves(saleMock);
    
    const req = { params: { productId: 0, saleId: 1 } };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_NOT_FOUND_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({
          message: 'Product not found in sale',
        });
        done();
      },
    };

    salesMiddlewares.productInSaleValidation(req, res, () => {
      done();
    });
  });
});
