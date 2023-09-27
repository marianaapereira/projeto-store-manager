const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesController = require('../../../src/controllers/sales.controller'); // Importe o serviço de vendas

const HTTP_OK_STATUS = 200;

describe('getAll Function', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar todas as vendas com sucesso', async function () {
    // const stub = 
    sinon.stub(salesController, 'getAll').resolves([{ id: 1, amount: 100 }, { id: 2, amount: 200 }]);

    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_OK_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal([{ id: 1, amount: 100 }, { id: 2, amount: 200 }]); // Verificar os dados das vendas
      },
    };

    await salesController.getAll({}, res);
  });
});
