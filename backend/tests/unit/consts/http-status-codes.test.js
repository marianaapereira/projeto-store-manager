const chai = require('chai');

const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_CONTENT_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_NOT_FOUND_STATUS,
} = require('../../../src/consts/http-status-codes');

const { expect } = chai;

describe('No arquivo de constantes', function () {
  it('o valor da const HTTP_OK_STATUS é 200', function () {
    expect(HTTP_OK_STATUS).to.be.equal(200);
  });

  it('o valor da const HTTP_CREATED_STATUS é 201', function () {
    expect(HTTP_CREATED_STATUS).to.be.equal(201);
  });

  it('o valor da const HTTP_NO_CONTENT_STATUS é 204', function () {
    expect(HTTP_NO_CONTENT_STATUS).to.be.equal(204);
  });

  it('o valor da const HTTP_BAD_REQUEST_STATUS é 400', function () {
    expect(HTTP_BAD_REQUEST_STATUS).to.be.equal(400);
  });

  it('o valor da const HTTP_UNAUTHORIZED_STATUS é 401', function () {
    expect(HTTP_UNAUTHORIZED_STATUS).to.be.equal(401);
  });

  it('o valor da const HTTP_NOT_FOUND_STATUS é 404', function () {
    expect(HTTP_NOT_FOUND_STATUS).to.be.equal(404);
  });
});