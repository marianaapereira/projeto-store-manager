const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const salesService = require('../../../src/services/sales.service');
const salesMock = require('../mocks/sales.mock');

const { saleErrors } = salesMock;

const { 
  HTTP_NOT_FOUND_STATUS, HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../../../src/consts/httpStatusCodes');

const SALE_DATE_MOCK = '2023-10-05T19:43:20.000Z';

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
    sinon.stub(salesService, 'getById').resolves(salesMock.saleProducts);
    
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

  it('a função paramsValidations lança um erro se faltar um productId', function (done) {
    const saleProductsMock = [
      {
        date: SALE_DATE_MOCK,
        quantity: 5,
      },
      {
        date: SALE_DATE_MOCK,
        productId: 2,
        quantity: 10,
      },
    ];
    
    const req = { body: saleProductsMock };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_BAD_REQUEST_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(saleErrors.productIdIsRequired);
        done();
      },
    };

    salesMiddlewares.paramsValidations(req, res, () => {
      done();
    });
  });

  it('a função paramsValidations lança um erro se faltar um quantity', function (done) {
    const saleProductsMock = [
      {
        date: SALE_DATE_MOCK,
        productId: 1,
        quantity: 5,
      },
      {
        date: SALE_DATE_MOCK,
        productId: 2,
      },
    ];
    
    const req = { body: saleProductsMock };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_BAD_REQUEST_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(saleErrors.quantityIsRequired);
        done();
      },
    };

    salesMiddlewares.paramsValidations(req, res, () => {
      done();
    });
  });

  it('a função paramsValidations lança um erro se uma quantity for inválida', function (done) {
    const saleProductsMock = [
      {
        date: SALE_DATE_MOCK,
        productId: 1,
        quantity: 5,
      },
      {
        date: SALE_DATE_MOCK,
        productId: 2,
        quantity: 0,
      },
    ];
    
    const req = { body: saleProductsMock };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(saleErrors.quantityMustBe);
        done();
      },
    };

    salesMiddlewares.paramsValidations(req, res, () => {
      done();
    });
  });

  it('a função quantityValidations lança um erro se a quantity não for passada', function (done) {
    const req = { body: { quantity: undefined } };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_BAD_REQUEST_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(saleErrors.quantityIsRequired);
        done();
      },
    };

    salesMiddlewares.quantityValidations(req, res, () => {});
  });

  it('a função quantityValidations lança um erro se a quantity for inválida', function (done) {
    const req = { body: { quantity: 0 } };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(saleErrors.quantityMustBe);
        done();
      },
    };

    salesMiddlewares.quantityValidations(req, res, () => {});
  });
});
