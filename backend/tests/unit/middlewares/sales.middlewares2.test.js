const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const salesService = require('../../../src/services/sales.service');
const productsService = require('../../../src/services/products.service');

const { 
  HTTP_NOT_FOUND_STATUS, // HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../../../src/consts/httpStatusCodes');

describe('Nos middlewares de sales', function () {
  afterEach(sinon.restore);

  it('a função productsExistenceCheck chama o serviço productsService.getById corretamente', async function () {
    const salesProductsArray = [
      { productId: 1 },
      { productId: 2 },
    ];

    const getByIdStub = sinon.stub(productsService, 'getById').resolves();

    const req = { body: salesProductsArray };
    const res = {};
    const next = sinon.stub();

    await salesMiddlewares.productsExistenceCheck(req, res, next);

    expect(getByIdStub.calledTwice).to.equal(true);
    expect(getByIdStub.firstCall).to.have.been.calledWith(1);
    expect(getByIdStub.secondCall).to.have.been.calledWith(2);

    getByIdStub.restore();
  });

  it('a função productsExistenceCheck chama next() se todos os produtos existirem', async function () {
    const salesProductsArray = [
      { productId: 1 },
      { productId: 2 },
    ];

    sinon.stub(productsService, 'getById').resolves();

    const req = { body: salesProductsArray };
    const res = {};
    const next = sinon.stub();

    await salesMiddlewares.productsExistenceCheck(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });

  it('a função productsExistenceCheck retorna um erro se algum produto não existir', async function () {
    const salesProductsArray = [
      { productId: 1 },
      { productId: 2 },
    ];

    const getByIdStub = sinon.stub(productsService, 'getById');
    getByIdStub.onFirstCall().resolves();
    getByIdStub.onSecondCall().throws(new Error('Produto não encontrado'));

    const req = { body: salesProductsArray };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_NOT_FOUND_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ message: 'Produto não encontrado' });
      },
    };
    const next = sinon.stub();

    await salesMiddlewares.productsExistenceCheck(req, res, next);

    expect(next.called).to.equal(false);

    getByIdStub.restore();
  });

  it('a função saleExistenceCheck chama o serviço salesService.getById corretamente', async function () {
    const saleId = 1;

    const getByIdStub = sinon.stub(salesService, 'getById').resolves();

    const req = { params: { id: saleId } };
    const res = {};
    const next = sinon.stub();

    await salesMiddlewares.saleExistenceCheck(req, res, next);

    expect(getByIdStub).to.have.been.calledOnceWithExactly(saleId);

    getByIdStub.restore();
  });

  it('a função saleExistenceCheck chama next() se a venda existir', async function () {
    const saleId = 1;

    sinon.stub(salesService, 'getById').resolves();

    const req = { params: { id: saleId } };
    const res = {};
    const next = sinon.stub();

    await salesMiddlewares.saleExistenceCheck(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });

  it('a função saleExistenceCheck retorna um erro se a venda não existir', async function () {
    const saleId = 1;

    sinon.stub(salesService, 'getById').throws(new Error('Venda não encontrada'));

    const req = { params: { id: saleId } };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_NOT_FOUND_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ message: 'Venda não encontrada' });
      },
    };
    const next = sinon.stub();

    await salesMiddlewares.saleExistenceCheck(req, res, next);

    expect(next.called).to.equal(false);
  });

  // it('a função quantityValidations chama next() se a quantidade for válida', function (done) {
  //   const req = { body: { quantity: 5 } };
  //   const res = {};
  //   const next = () => {
  //     done();
  //   };

  //   salesMiddlewares.quantityValidations(req, res, next);
  // });

  // it('a função quantityValidations retorna um erro se a quantidade não for válida', function (done) {
  //   const req = { body: { quantity: 0 } };
  //   const res = {
  //     status: (statusCode) => {
  //       expect(statusCode).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
  //       return res;
  //     },
  //     json: (data) => {
  //       expect(data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  //       done();
  //     },
  //   };
  //   const next = () => {};

  //   salesMiddlewares.quantityValidations(req, res, next);
  // });
});
