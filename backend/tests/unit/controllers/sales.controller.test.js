const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const salesMock = require('../mocks/sales.mock');

const { HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS } = require('../../../src/consts/httpStatusCodes');

describe('No controller de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('a função getAll retorna todas as vendas com sucesso', async function () {
    sinon.stub(salesService, 'getAll').resolves(salesMock.sales);

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(salesMock.sales);
      },
    };

    await salesController.getAll({}, res);
  });

  it('a função getById retorna a venda passada por parâmetro', async function () {
    sinon.stub(salesService, 'getById').resolves(salesMock.sale);

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(salesMock.sale);
      },
    };

    await salesController.getById({ params: { id: 2 } }, res);
  });

  it('a função registerSale retorna a venda criada com os produtos corretos', async function () {
    sinon.stub(salesService, 'registerSale').resolves({ id: 5, itemsSold: salesMock.sale });

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_CREATED_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.have.property('id', 5);
        expect(data).to.have.property('itemsSold', salesMock.sale);
      },
    };

    await salesController.registerSale({ body: salesMock.sales }, res);
  });

  it('a função deleteSale retorna o código http correto e não retorna dados', async function () {
    sinon.stub(salesService, 'deleteSale').resolves();

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_NO_CONTENT_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal();
      },
    };

    await salesController.deleteSale({ params: { id: 2 } }, res);
  });

  it('a função updateProductQuantity retorna o código http correto e não retorna dados', async function () {
    const mock = {
      date: '2023-05-06T03:14:28.000Z',
      productId: 2,
      quantity: 20,
      saleId: 1,
    };

    sinon.stub(salesService, 'updateProductQuantity').resolves(mock);

    const req = { 
      params: { saleId: 1, productId: 2 },
      body: { quantity: 20 },
    };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.have.property('saleId', 1);
        expect(data).to.have.property('productId', 2);
        expect(data).to.have.property('quantity', 20);
      },
    };

    await salesController.updateProductQuantity(req, res);
  });
});
