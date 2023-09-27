// const chai = require('chai');
// const sinon = require('sinon');

// const salesModel = require('../../../src/models/sales.model');

// const { expect } = chai;

// describe('O model de sales', function () {
//   afterEach(sinon.restore);

//   it('não deve lançar erros quando saleProducts.forEach é chamado', async function () {
//     const forEachStub = sinon.stub();

//     const saleProducts = [
//       {
//         productId: 1,
//         quantity: 1,
//       },
//       {
//         productId: 2,
//         quantity: 5,
//       },
//     ];

//     await salesModel.registerSale(saleProducts);
//     expect(forEachStub.called).to.be.true;
//   });
// });