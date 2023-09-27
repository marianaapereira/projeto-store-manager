const chai = require('chai');
const sinon = require('sinon');

const productsMiddlewares = require('../../../src/middlewares/products.middlewares');

const { 
  HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../../../src/consts/httpStatusCodes');

const { expect } = chai;

describe('Nos middlewares de products', function () {
  afterEach(sinon.restore);

   it('a função validateProductName deve retornar status 400 e mensagem de erro se o nome do produto não for fornecido', function (done) {
    const req = { body: {} };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_BAD_REQUEST_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({ message: '"name" is required' });
        done();
      },
    };

    productsMiddlewares.validateProductName(req, res, () => {});
  });

  it('deve retornar status 422 e mensagem de erro se o nome for muito curto', function (done) {
    const req = { body: { name: 'abc' } };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
        return res;
      },
      json: (data) => {
        expect(data).to.deep.equal({
          message: '"name" length must be at least 5 characters long',
        });
        done();
      },
    };

    productsMiddlewares.validateProductName(req, res, () => {});
  });

  it('deve chamar next() se o nome for válido', function (done) {
    const req = { body: { name: 'NomeVálido' } };
    const res = {
      status: () => res,
      json: () => {},
    };

    productsMiddlewares.validateProductName(req, res, () => {
      done(); // O middleware deve chamar next() se o nome for válido
    });
  });

  // it('1', async function () {
  //   const req = { body: { name: 'productName' } };
  //   const res = Response;
  //   const next = sinon.stub().returns();

  //   productsMiddlewares.validateProductName(req, res, next);
  //   expect(next).to.have.been.calledWith();
  // });

  //   it('deve retornar status 400 ao fazer uma requisição POST com nome inválido', function (done) {
  //   const server = http.createServer(app);

  //   server.listen(0, function () {
  //     const { port } = server.address();
  //     const requestOptions = {
  //       hostname: 'localhost',
  //       port,
  //       path: '/products',
  //       method: 'POST',
  //     };

  //     const req = http.request(requestOptions, function (res) {
  //       expect(res.statusCode).to.equal(400);
  //       server.close();
  //       done();
  //     });

  //     req.end();
  //   });
  // });
});
