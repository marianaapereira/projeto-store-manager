const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const salesMock = require('../mocks/sales.mock');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

const { saleErrors } = salesMock;

chai.use(sinonChai);

describe('No service de sales', function () {
  afterEach(sinon.restore);

  it('a função getById lança erro corretamente se a venda não for encontrada', async function () {
    try {
      sinon.stub(salesModel, 'getById').resolves();
      await salesService.getById(1);
    } catch (error) {
      expect(error.message).to.equal(saleErrors.saleNotFound.message);
    }
  });

  it('a função getById lança erro corretamente se a venda não tiver itens cadastrados', async function () {
    try {
      sinon.stub(salesModel, 'getById').resolves([]);
      await salesService.getById(1);
    } catch (error) {
      expect(error.message).to.equal(saleErrors.saleNotFound.message);
    }
  });

  it('a função getById não lança erro em caso de sucesso', async function () {
    sinon.stub(salesModel, 'getById').resolves([
      {
        date: '2023-10-05T03:37:21.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-10-05T03:37:21.000Z',
        productId: 2,
        quantity: 10,
      },
    ]);

    expect(async () => salesService.getById(1)).to.not.throw();
  });
});