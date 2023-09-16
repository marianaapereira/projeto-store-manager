const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const productsMock = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

chai.use(sinonChai);
const { expect } = chai;

describe('O arquivo index de models', function () {
  afterEach(sinon.restore);

  it('recebe as funções do model de products', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsMock.products]);

    // act
    const products = await productsModel.getAll();

    // assert
    expect(products).to.be.equal(productsMock.products);
  });

    it('exibe o produto correto de acordo com o id na url', async function () {
    // arrange
    const productId = 3;
    sinon.stub(productsModel, 'getById').resolves(productsMock.products[2]);

    // act
    const product = await productsModel.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.products[2]);
  });

  it('retorna um erro se não encontrar o produto pelo id na rota', async function () {
    // arrange
    const productId = 5;
    sinon.stub(productsModel, 'getById').resolves(productsMock.notFoundError);

    // act
    const product = await productsModel.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.notFoundError);
  });
});