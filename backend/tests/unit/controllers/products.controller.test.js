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
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal(productsMock.products);
      },
    };

    await productsController.getAll({}, res);
  });
  
  it('a função getById retorna o produto passado por parâmetro', async function () {
    sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Produto 1' });
    
    const req = { params: { id: 1 } };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ id: 1, name: 'Produto 1' });
      },
    };

    await productsController.getById(req, res);
  });

  it('a função registerProduct retorna o produto criado com o nome correto', async function () {
    sinon.stub(productsService, 'registerProduct').resolves({ id: 1, name: 'produto' });
  
    const req = { body: { name: 'produto' } };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_CREATED_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ id: 1, name: 'produto' });
      },
    };
  
    await productsController.registerProduct(req, res);
  });

  it('a função deleteProduct retorna o código http correto e não retorna mensagem', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves();
  
    const req = { params: { id: 1 } };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_NO_CONTENT_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal();
      },
    };
  
    await productsController.deleteProduct(req, res);
  });

  it('a função updateProduct retorna o produto atualizado', async function () {
    sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'produto 2' });
  
    const req = { 
      params: { id: 1 },
      body: { name: 'produto 2' },
    };

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ id: 1, name: 'produto 2' });
      },
    };
  
    await productsController.updateProduct(req, res);
  });
});