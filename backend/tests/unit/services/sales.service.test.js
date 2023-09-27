const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const salesMock = require('../mocks/sales.mock');
const salesService = require('../../../src/services/sales.service');

chai.use(sinonChai);

describe('No service de sales:', function () {
  afterEach(sinon.restore);

  it('a função getById retorna corretamente os itens da venda passada como parâmetro', async function () {
    const saleId = 2;
    sinon.stub(salesService, 'getById').resolves(salesMock.sale);

    const sale = await salesService.getById(saleId);
    expect(sale).to.be.equal(salesMock.sale);
  });

  it('a função getById retorna uma mensagem de erro se não houverem produtos na venda passada como parâmetro', async function () {
    const saleId = 5;
    sinon.stub(salesService, 'getById').resolves([]);

    try {
      await salesService.getById(saleId);
    } catch (error) {
      expect(error.message).toBe(salesMock.notFoundError.message);
    }
  });

  it('a função getById retorna uma mensagem de erro se a venda passada como parâmetro não existir', async function () {
    const saleId = undefined;
    sinon.stub(salesService, 'getById').resolves(undefined);

    try {
      await salesService.getById(saleId);
    } catch (error) {
      expect(error.message).toBe(salesMock.notFoundError.message);
    }
  });
});