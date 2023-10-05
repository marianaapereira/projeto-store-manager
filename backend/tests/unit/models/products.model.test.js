const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const productsMock = require('../mocks/products.mock');
const productModel = require('../../../src/models/products.model');

chai.use(sinonChai);
const { expect } = chai;

describe('No model de products', function () {
  afterEach(sinon.restore);

  it('a função getAll lista todos os produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsMock.products]);

    // act
    const products = await productModel.getAll();

    // assert
    expect(products).to.be.equal(productsMock.products);
  });

  it('a função getById exibe o produto correto de acordo com o id na url', async function () {
    // arrange
    const productId = 3;
    sinon.stub(productModel, 'getById').resolves(productsMock.products[2]);

    // act
    const product = await productModel.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.products[2]);
  });

  it('a função getById retorna um erro se não encontrar o produto pelo id na rota', async function () {
    // arrange
    const productId = 5;
    sinon.stub(productModel, 'getById').resolves(productsMock.notFoundError);

    // act
    const product = await productModel.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.notFoundError);
  });

  it('a função registerProduct registra o produto com o nome correto', async function () {
    // arrange
    const newProductName = 'produto novo';
    const newExpectedProduct = { id: 5, name: newProductName };
    
    sinon.stub(connection, 'execute').resolves([[newExpectedProduct]]);

    // act
    const newProduct = await productModel.registerProduct(newProductName);

    // assert
    expect(newProduct).to.be.equal(newExpectedProduct);
    expect(newProduct).to.have.property('name').equal(newProductName);
  });
});