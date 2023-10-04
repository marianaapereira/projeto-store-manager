const chai = require('chai');
const sinon = require('sinon');

const productsMock = require('../mocks/products.mock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { 
  HTTP_OK_STATUS, // HTTP_CREATED_STATUS,
} = require('../../../src/consts/httpStatusCodes');

const { expect } = chai;

describe('No controller de products', function () {
  afterEach(sinon.restore);

  it('a função getAll deve retornar todos os produtos corretamente', async function () {
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

  it('a função getById deve retornar o produto correto passado por parâmetro', async function () {
    // Configurar um stub ou mock para productsService.getById
    sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Produto 1' });

    const req = { params: { id: 1 } };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ id: 1, name: 'Produto 1' }); // Verificar os dados do produto
      },
    };

    await productsController.getById(req, res);
  });

  // it('deve tratar o cenário de produto não encontrado', async function () {
  //   // Configurar um stub ou mock para productsService.getById que retorna um erro
  //   const error = new Error('Produto não encontrado');
  //   sinon.stub(productsService, 'getById').rejects(error);

  //   const req = { params: { id: 1 } };
  //   const res = {
  //     status: (statusCode) => {
  //       expect(statusCode).to.equal(404); // Verificar o status de not found
  //       return res;
  //     },
  //     json: (data) => {
  //       expect(data).to.deep.equal({ message: 'Produto não encontrado' }); // Verificar a mensagem de erro
  //     },
  //   };

  //   await productsController.getById(req, res);
  // });
});