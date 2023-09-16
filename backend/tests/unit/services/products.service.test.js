const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const productsMock = require('../mocks/products.mock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

chai.use(sinonChai);

describe('O service de products', function () {
  afterEach(sinon.restore);

  it('exibe o produto correto de acordo com o id na url', async function () {
    // arrange
    const productId = 3;
    sinon.stub(productsModel, 'getById').resolves(productsMock.products[2]);

    // act
    const product = await productsService.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.products[2]);
  });

  // it('retorna um erro se não encontrar o produto pelo id na rota', async function () {
  //   // arrange
  //   // const productId = 5;
  //   sinon.stub(productsModel, 'getById').resolves(productsMock.notFoundError);
    
  //   // act

  //   // assert
  //   expect(() => productsService.getById()).to.throw(Error, 'Product not found');
  //   // expect(getProduct()).to.be.equal(productsMock.notFoundError);
  // });

  it('retorna a mensagem de erro correta se não encontrar o produto pelo id na rota', async function () {
    // arrange
    const productId = 5;
    sinon.stub(productsModel, 'getById').resolves(productsMock.notFoundError);

    // act
    const product = await productsService.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.notFoundError);
  });
});