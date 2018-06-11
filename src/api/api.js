'use strict';

const router = require('../lib/router.js');


/**
 * GET Route (/)
 * Accepts an optional "name" query string parameter and says Hello
 * test with httpie:
 *     http http://localhost:8080
 *     http http://localhost:8080?name=Madhu
 */
router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  let name = req.query.name || '';
  res.write(`Hello ${name}`);
  res.end();
});

router.get('/api/v1/books/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  let id = req.query.id || '';
  let arr = ['123','321','256'];
  let flag;
  if(id!==''){
    for(let i of arr){
      if(i === id){
        flag = true;
      }
    }
    if(flag){
      res.write(`Book number ${id} is requested`);
      res.end();
    }
    else{
      res.statusCode = 404;
      res.statusMessage = 'not found';
      res.write('resource not found');
      res.end();
    }
  }
  else{
    res.statusCode = 400;
    res.statusMessage = 'bad request';
    res.write('bad request');
    res.end();
  }
  
});
/**
 * POST Route (/data)
 * Accepts a JSON object and simply regurgitates it back to the browser
 * test with httpie:
 *     echo '{"title":"Go Home","content":"foobar"}' | http post http://localhost:8080/data
 */
router.post('/api/v1/books/', (req,res) => {
  console.log(req.body);
  if(req.body === {}){
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request: Request body not received');
    res.end();
  }
  else{
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.write( JSON.stringify(req.body) );
    res.end();
  }
  
});

router.put('/api/v1/books/', (req,res) => {
  if(req.body === {}){
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request: Request body not received');
    res.end();
  }
  else{
    res.statusCode = 200;
    let id = req.query.id || '';
    res.statusMessage = `${id} PUT Request`;
    res.write(JSON.stringify(req.body));
    res.end();
  }
});

router.delete('/api/v1/books/', (req,res) => {
  let id = req.query.id || '';
  if(id!==''){
    res.statusCode = 200;
    res.statusMessage = 'OK' + id;
    res.write(`book record ${id} is deleted`);
    res.end();
  }
  else{
    res.statusCode = 400;
    res.statusMessage = 'bad request';
    res.write('bad request');
    res.end();
  }
});

module.exports = {};