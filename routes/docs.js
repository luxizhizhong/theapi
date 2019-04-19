// es6
var express = require('express');
var router = express.Router();
var fs = require('fs')
/* GET home page. */
router.get('/docs', function (req, res, next) {
  var data = ''
  fs.readFile('./docs.md',{encoding: 'utf8'},function(err,data){
    if (err) {
      data = `./docs.md 文件未找到,无法编译`
      console.error(err)
    } else {
      data = data
    }
  })
  res.render('docs',{
    txt: new Date()
  })
});

module.exports = router;