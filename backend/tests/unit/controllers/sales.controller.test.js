const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const salesMock = require('../mocks/sales.mock');

const { 
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS, HTTP_NOT_FOUND_STATUS, 
} = require('../../../src/consts/httpStatusCodes');

describe('No controller de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('a função getAll retorna todas as vendas com sucesso', async function () {
    sinon.stub(salesService, 'getAll').resolves(salesMock.sales);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),

      // status: (statusCode) => {
      //   expect(statusCode).to.equal(HTTP_OK_STATUS);
      //   return res;
      // },
      // json: (data) => {
      //   expect(data).to.deep.equal(salesMock.sales);
      // },
    };

    await salesController.getAll({}, res);

    expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
    expect(res.json).to.have.been.calledWith(salesMock.sales);
  });

  it('a função getById retorna a venda passada por parâmetro', async function () {
    const saleId = 2;

    sinon.stub(salesService, 'getById').resolves(salesMock.sale);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),

      // status: (statusCode) => {
      //   expect(statusCode).to.equal(HTTP_OK_STATUS);
      //   return res;
      // },
      // json: (data) => {
      //   expect(data).to.deep.equal(salesMock.sale);
      // },
    };

    await salesController.getById({ params: { id: saleId } }, res);

    expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
    expect(res.json).to.have.been.calledWith(salesMock.sale);
  });

  it('a função getById retorna um erro se não encontrar a venda solicitada', async function () {
    const saleId = 0;

    sinon.stub(salesService, 'getById').throws(new Error('Sale not found'));

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),

      // status: (statusCode) => {
      //   expect(statusCode).to.equal(HTTP_OK_STATUS);
      //   return res;
      // },
      // json: (data) => {
      //   expect(data).to.deep.equal(salesMock.sale);
      // },
    };

    await salesController.getById({ params: { id: saleId } }, res);

    expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
    expect(res.json).to.have.been.calledWith(salesMock.saleErrors.saleNotFound);
  });

  it('a função registerSale retorna a venda criada com os produtos corretos', async function () {
    // const saleId = 5;

    const newSaleMock = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const newSaleProductsMock = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    sinon.stub(salesService, 'registerSale').resolves(newSaleMock);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      // status: (statusCode) => {
      //   expect(statusCode).to.equal(HTTP_CREATED_STATUS);
      //   return res;
      // },
      // json: (data) => {
      //   expect(data).to.have.property('id', 5);
      //   expect(data).to.have.property('itemsSold', salesMock.sale);
      // },
    };

    await salesController.registerSale({ body: newSaleProductsMock }, res);

    expect(res.status).to.have.been.calledWith(HTTP_CREATED_STATUS);
    expect(res.json).to.have.been.calledWith(newSaleMock);
    // expect(res.json).to.have.property('id', saleId);
    // expect(res.json).to.have.property('itemsSold', newSaleMock.itemsSold);
  });

  it('a função deleteSale retorna o código http correto e não retorna dados', async function () {
    const saleId = 5;

    sinon.stub(salesService, 'deleteSale').resolves();

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),

      // status: (statusCode) => {
      //   expect(statusCode).to.equal(HTTP_NO_CONTENT_STATUS);
      //   return res;
      // },
      // json: (data) => {
      //   expect(data).to.deep.equal();
      // },
    };

    await salesController.deleteSale({ params: { id: saleId } }, res);

    expect(res.status).to.have.been.calledWith(HTTP_NO_CONTENT_STATUS);
    expect(res.json).to.have.been.calledWith();
  });

  it('a função updateProductQuantity retorna o código http correto e não retorna dados', async function () {
    sinon.stub(salesService, 'updateProductQuantity').resolves(salesMock.sale);

    const req = { 
      params: { saleId: 1, productId: 15 },
      body: { quantity: 20 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),

      // status: (statusCode) => {
      //   expect(statusCode).to.equal(HTTP_OK_STATUS);
      //   return res;
      // },
      // json: (data) => {
      //   expect(data).to.have.property('saleId', 1);
      //   expect(data).to.have.property('productId', 2);
      //   expect(data).to.have.property('quantity', 20);
      // },
    };

    await salesController.updateProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
    expect(res.json).to.have.been.calledWith(salesMock.sale);
  });
});
