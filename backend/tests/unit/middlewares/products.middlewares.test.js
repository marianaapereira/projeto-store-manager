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

  it('a função validateProductName deve retornar status 422 e mensagem de erro se o nome do produto for menor do que o mínimo permitido', function (done) {
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

  it('a função validateProductName deve retornar status 422 e mensagem de erro se o nome do produto for igual ao número mínimo permitido', function (done) {
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

  it('a função validateProductName deve chamar next() se o nome do produto for válido', function (done) {
    const req = { body: { name: 'arroz' } };

    const res = {
      status: () => res,
      json: () => {},
    };

    productsMiddlewares.validateProductName(req, res, () => {
      done();
    });
  });
});
