const chai = require('chai');
const http = require('http');

const { expect } = chai;

const app = require('../../../src/app');

describe('A rota /sales', function () {
  it('deve retornar status 200 ao exibir todas as vendas', function (done) {
    const server = http.createServer(app);

    server.listen(0, function () {
      const { port } = server.address();
      const requestOptions = {
        hostname: 'localhost',
        port,
        path: '/sales',
        method: 'GET',
      };

      const req = http.request(requestOptions, function (res) {
        expect(res.statusCode).to.equal(200);
        server.close();
        done();
      });

      req.end();
    });
  });

  it('deve retornar status 404 ao tentar acessar uma venda inexistente', function (done) {
    const server = http.createServer(app);

    server.listen(0, function () {
      const { port } = server.address();
      const requestOptions = {
        hostname: 'localhost',
        port,
        path: '/sales/10',
        method: 'GET',
      };

      const req = http.request(requestOptions, function (res) {
        expect(res.statusCode).to.equal(404);
        server.close();
        done();
      });

      req.end();
    });
  });
});