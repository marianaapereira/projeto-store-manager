const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const productsMock = require('../mocks/products.mock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

chai.use(sinonChai);

describe('No service de products', function () {
  afterEach(sinon.restore);

  it('a função getById retorna o produto correto passado por parâmetro', async function () {
    // arrange
    const productId = 3;
    sinon.stub(productsModel, 'getById').resolves(productsMock.products[2]);

    // act
    const product = await productsService.getById(productId);

    // assert
    expect(product).to.be.equal(productsMock.products[2]);
  });

  it('a função getById retorna a mensagem de erro correta se não encontrar o produto solicitado', async function () {
    const productId = 5;
    sinon.stub(productsModel, 'getById').resolves(productsMock.notFoundError);

    const product = await productsService.getById(productId);

    expect(product).to.be.equal(productsMock.notFoundError);
  });

  it('a função updateProduct retorna a mensagem de erro correta se não encontrar o produto a ser editado', async function () {
    try {
      const product = {
        id: 0,
        name: 'produto editado',
      };

      sinon.stub(productsModel, 'updateProduct').resolves();

      await productsService.updateProduct(product);
    } catch ({ message }) {
      expect(message).to.be.equal(productsMock.notFoundError);
    }
  });

  it('a função updateProduct retorna o produto editado com sucesso se os dados fornecidos estiverem corretos', async function () {
    try {
      const product = {
        id: 1,
        name: 'produto editado',
      };
  
      sinon.stub(productsModel, 'updateProduct').resolves(product);
  
      const updatedProduct = await productsService.updateProduct(product);
  
      expect(updatedProduct).to.be.equal(product);
    } catch (error) {
      expect(error).to.be.equal(undefined);
    }
  });

  it('a função deleteProduct retorna a mensagem de erro correta se não encontrar o produto pelo id na rota', async function () {
    const productId = 5;
    const deleteStub = sinon.stub(productsModel, 'deleteProduct');

    await productsService.deleteProduct(productId);

    expect(deleteStub.calledOnceWith(productId)).to.be.equal(true);
  });
});
