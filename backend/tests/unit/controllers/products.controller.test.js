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

  it('deve tratar o cenário de produto não encontrado', async function () {
    // Configurar um stub ou mock para productsService.getById que retorna um erro
    const error = new Error('Produto não encontrado');
    sinon.stub(productsService, 'getById').rejects(error);

    const req = { params: { id: 1 } };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(404); // Verificar o status de not found
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ message: 'Produto não encontrado' }); // Verificar a mensagem de erro
      },
    };

    await productsController.getById(req, res);
  });

  // it('deve registrar um produto com sucesso', async function () {
  //   // Configurar um stub ou mock para productsService.registerProduct
  //   sinon.stub(productsService, 'registerProduct').resolves({ id: 1, name: 'Produto 1' });

  //   const req = { body: { name: 'Produto 1' } };
  //   const res = {
  //     status: (statusCode) => {
  //       expect(statusCode).to.equal(HTTP_CREATED_STATUS);
  //       return res;
  //     },
  //     json: (data) => {
  //       expect(data).to.deep.equal({ id: 1, name: 'Produto 1' }); // Verificar os dados do produto registrado
  //     },
  //   };

  //   await productsController.registerProduct(req, res);
  // });

  // it('deve tratar o cenário de erro ao registrar o produto', async function () {
  //   // Configurar um stub ou mock para productsService.registerProduct que retorna um erro
  //   sinon.stub(productsService, 'registerProduct').rejects(productsMock.notFoundError);

  //   const req = { body: { name: 'Produto Inválido' } };
  //   const res = {
  //     status: (statusCode) => {
  //       expect(statusCode).to.equal(500); // Verificar o status de erro interno do servidor
  //       return res;
  //     },
  //     json: (data) => {
  //       expect(data).to.deep.equal({ error: 'Erro ao registrar o produto' }); // Verificar a mensagem de erro
  //     },
  //   };

  //   await productsController.registerProduct(req, res);
  // });

  // it('a função getById retorna corretamente os dados do produto passado como parâmetro', async function () {
  //   const productId = 3;
  //   sinon.stub(productsController, 'getById').resolves(productsMock.products[2]);

  //   const product = await productsController.getById(productId);

  //   expect(product).to.be.equal(productsMock.products[2]);
  // });

  //  it('a função getById retorna uma mensagem de erro se o produto passado como parâmetro não existir', async function () {
  //   const saleId = undefined;
  //   sinon.stub(productsController, 'getById').resolves(undefined);

  //   try {
  //     await productsController.getById(saleId);
  //   } catch (error) {
  //     expect(error.message).toBe(productsMock.notFoundError.message);
  //   }
  // });
});