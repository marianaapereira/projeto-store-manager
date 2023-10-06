const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const productsService = require('../../../src/services/products.service');

const { 
  HTTP_NOT_FOUND_STATUS,
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
});
