var express = require('express');
var router = express();
const fs = require('fs');
const path = require('path');
const { title } = require('process');
let test = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HackHub' });
  //res.send('this is a GET method');
});

router.post('/book', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  test[0] = req.body;
  console.log("test");
  console.log(test[0]);
  res.send(`this is a POST method, and the body is ${req.body.content}`);
});


router.get('/book', function(req, res, next) {
  res.render('book', 
    { title: 'Harry Potter', 
      author: 'J.K. Rowling', 
      content: 'This is a book about a boy who goes to a magical school.' 
    });
});

router.get('/book/:bookID', function(req, res, next) {
  res.render('book', 
    { 
      id: req.params.bookID,
      title: 'Harry Potter', 
      author: 'J.K. Rowling', 
      content: 'This is a book about a boy who goes to a magical school.' 
    });
});

router.get('/book/:bookID/:bookName', function(req, res, next) {
  res.render('book', 
    { 
      name: req.params.bookName,
      id: req.params.bookID,
      title: 'Harry Potter', 
      author: 'J.K. Rowling', 
      content: 'This is a book about a boy who goes to a magical school.' 
    });
});

//-------------------------------------------------------------------------------
//===============================exercise 3.1====================================
// this is the get method for display books.json
router.get('/booksList', function(req, res, next){
  //console.log("before read");
  const filePath = path.join(__dirname, '../books.json');
  const filePathTest = path.join(__dirname);
  //console.log("File path is:", filePathTest);
  //fs.readFile(filePath, 'utf8', function(err, data){
  fs.readFile('books.json', 'utf8', function(err, data){
    if(err){
      res.status(500).send('Error reading data');
      res.end();
    }
    //console.log("after read");
    const booksList = JSON.parse(data);
    //console.log(booksList[0]);
    res.render('booksList',
      {
      title : 'Books List',
      booksList
    });
  });
});

module.exports = router;
