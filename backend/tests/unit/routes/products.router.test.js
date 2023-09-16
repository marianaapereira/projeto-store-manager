// const chai = require('chai');

// const { expect } = chai;

const request = require('supertest');

// Importe o aplicativo ou módulo do servidor que você deseja testar
const app = require('../../../src/app'); // Substitua pelo caminho correto para o seu aplicativo

describe('As funções do router', function () {
  it('deve retornar status 200 ao fazer uma requisição GET', function (done) {
    request(app)
      .get('/products')
      .expect(200)
      .end(function (err, _res) {
        if (err) return done(err);
        done();
      });
  });

  it('deve retornar status 404 ao fazer uma requisição para uma rota inexistente', function (done) {
    request(app)
      .get('/products/10')
      .expect(404)
      .end(function (err, _res) {
        if (err) return done(err);
        done();
      });
  });
});
