'use strict';

const superagent = require('superagent');
const app = require('../../../src/app');
const uuid = require('uuid/v4');

describe('Simple Web Server', () => {
  beforeAll( () => {
    app.start(5000);
  });
  afterAll( () => {
    app.stop();
  });

  it('handles a bad get request if the route is not found as part of api implementation', () => {

    return superagent.get('http://localhost:5000/?name=Madhu')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello Madhu');
      });
  });

  it('handles a bad get request if the route is not found as part of api implementation', () => {

    return superagent.get('http://localhost:5000/api/v2')
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: Not Found');
      });
  });

  it('handles a get request with a query string with correct id value passed', () => {
    let id = 123;
    return superagent.get(`http://localhost:5000/api/v1/books/?id=${id}`)
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(`Book number ${id} is requested`);
      });
  });
  it('handles a bad get request with an empty id as query string', () => {
    return superagent.get(`http://localhost:5000/api/v1/books/?id=`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles a get request with a query string with id that was not found', () => {
    let id = uuid();
    return superagent.get(`http://localhost:5000/api/v1/books/?id=${id}`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: Not Found');
      });
  });
  it('handles a post request along with JSON object', () => {
    let obj = {'title':'JavaScript','content':'js'};
    return superagent.post(`http://localhost:5000/api/v1/books/`)
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('JavaScript'));
      });
  });
  it('handles a bad post request with empty object passed', () => {
    let obj = {};
    return superagent.post(`http://localhost:5000/api/v1/books/`)
      .send(obj)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles a PUT request with JSON as input and output', () => {
    let obj = {'title':'JavaScript','content':'js'};
    return superagent.put(`http://localhost:5000/api/v1/books/`)
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(JSON.parse(response.text)).toEqual(obj);
      });
  });
  it('handles a bad put request with empty object passed', () => {
    let obj = {};
    return superagent.put(`http://localhost:5000/api/v1/books/`)
      .send(obj)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles a delete request with a query string with correct id value passed', () => {
    let id = 123;
    return superagent.delete(`http://localhost:5000/api/v1/books/?id=${id}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(`book record ${id} is deleted`);
      });
  });
  it('handles a bad delete request with an empty id as query string', () => {
    return superagent.delete(`http://localhost:5000/api/v1/books/?id=`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  
});