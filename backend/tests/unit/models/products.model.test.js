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

  it('a função getById retorna o produto corretamente', async function () {
    // arrange
    const productId = 3;
    const productMock = productsMock.products[2];
    sinon.stub(connection, 'execute').resolves([[productMock]]);

    // act
    const product = await productModel.getById(productId);

    // assert
    expect(product).to.be.equal(productMock);
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

  it('a função updateProduct atualiza o produto corretamente', async function () {
    // arrange
    const productMock = productsMock.products[2];
    sinon.stub(connection, 'execute').resolves([[productMock]]);

    // act
    const product = await productModel.updateProduct(productMock);

    // assert
    expect(product).to.be.equal(productMock);
  });

  it('a função deleteProduct deleta o produto corretamente', async function () {
    // arrange
    const productId = 3;
    sinon.stub(connection, 'execute').resolves();

    // act
    const deletedProduct = await productModel.deleteProduct(productId);

    // assert
    expect(deletedProduct).to.be.equal(undefined);
  });
});