const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const salesMock = require('../mocks/sales.mock');
const salesModel = require('../../../src/models/sales.model');

chai.use(sinonChai);
const { expect } = chai;

describe('No model de products', function () {
  afterEach(sinon.restore);

  it('a função getAll lista todos as vendas', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([salesMock.sales]);

    // act
    const sales = await salesModel.getAll();

    // assert
    expect(sales).to.be.equal(salesMock.sales);
  });

  it('a função getById retorna a venda corretamente', async function () {
    // arrange
    const saleId = 3;
    const saleMock = salesMock.sale;
    sinon.stub(connection, 'execute').resolves([saleMock]);

    // act
    const sale = await salesModel.getById(saleId);

    // assert
    expect(sale).to.be.equal(saleMock);
  });

  it('a função createNewSale retorna o id da nova venda', async function () {
    const insertId = 5;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);

    const newSaleId = await salesModel.createNewSale();

    expect(newSaleId).to.be.equal(insertId);
  });

  it('a função getInsertedSaleProducts retorna os produtos vendidos em determinada venda', async function () {
    const saleId = 5;
    const insertedSaleProducts = salesMock.sales;
    sinon.stub(connection, 'execute').resolves([insertedSaleProducts]);

    const productsSold = await salesModel.getInsertedSaleProducts(saleId);

    expect(productsSold).to.be.equal(insertedSaleProducts);
  });

  it('a função deleteSale retorna a nova venda', async function () {
    const saleId = 5;
    sinon.stub(connection, 'execute').resolves();

    const deletedSale = await salesModel.deleteSale(saleId);

    expect(deletedSale).to.be.equal(undefined);
  });
});