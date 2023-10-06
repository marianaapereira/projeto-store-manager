const chai = require('chai');
const sinon = require('sinon');

const productsMock = require('../mocks/products.mock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { 
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS,
} = require('../../../src/consts/httpStatusCodes');

const { expect } = chai;

describe('No controller de products', function () {
  afterEach(sinon.restore);

  it('a função getAll retorna todos os produtos corretamente', async function () {
    sinon.stub(productsService, 'getAll').resolves(productsMock.products);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAll({}, res);

    expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
    expect(res.json).to.have.been.calledWith(productsMock.products);
  });
  
  it('a função getById retorna o produto passado por parâmetro', async function () {
    const productId = 1;
    const productMock = productsMock.products[0];

    sinon.stub(productsService, 'getById').resolves(productMock);
    
    const req = { params: { id: productId } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
    expect(res.json).to.have.been.calledWith(productMock);
  });

  it('a função registerProduct retorna o produto criado com o nome correto', async function () {
    const productMock = productsMock.products[0];
    const productName = 'Martelo de Thor';

    sinon.stub(productsService, 'registerProduct').resolves(productMock);
  
    const req = { body: { name: productName } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.registerProduct(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_CREATED_STATUS);
    expect(res.json).to.have.been.calledWith(productMock);
  });

  it('a função deleteProduct retorna o código http correto e não retorna mensagem', async function () {
    const productId = 1;

    sinon.stub(productsService, 'deleteProduct').resolves();
  
    const req = { params: { id: productId } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_NO_CONTENT_STATUS);
    expect(res.json).to.have.been.calledWith();
  });

  it('a função updateProduct retorna o produto atualizado', async function () {
    const productMock = productsMock.products[0];
    const productName = 'Martelo de Thor';
    const productId = 1;

    sinon.stub(productsService, 'getById').resolves(productMock);
    sinon.stub(productsService, 'updateProduct').resolves(productMock);
  
    const req = { 
      params: { id: productId },
      body: { name: productName },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
    expect(res.json).to.have.been.calledWith(productMock);
  });
});