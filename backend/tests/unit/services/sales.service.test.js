// const sinon = require('sinon');
// const chai = require('chai');
// const sinonChai = require('sinon-chai');

// const { expect } = chai;

// const salesMock = require('../mocks/sales.mock');
// const salesModel = require('../../../src/models/sales.model');
// const salesService = require('../../../src/services/sales.service');

// chai.use(sinonChai);

// describe('O service de sales', function () {
//   afterEach(sinon.restore);

//   it('exibe a venda correta de acordo com o id na url', async function () {
//     // arrange
//     const saleId = 2;
//     sinon.stub(salesModel, 'getById').resolves(salesMock.sale);
//     console.log(salesMock.sale);

//     // act
//     const sale = await salesService.getById(saleId);

//     // assert
//     console.log(sale);
//     expect(sale).to.be.equal(salesMock.sale);
//   });

//   // it('retorna a mensagem de erro correta se não encontrar o produto pelo id na rota', async function () {
//   //   // arrange
//   //   const productId = 5;
//   //   sinon.stub(salesModel, 'getById').resolves(salesMock.notFoundError);

//   //   // act
//   //   const product = await salesService.getById(productId);

//   //   // assert
//   //   expect(product).to.be.equal(salesMock.notFoundError);
//   // });
// });