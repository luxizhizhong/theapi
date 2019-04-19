var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '✔️ luxi-api 〰️',
    date: new Date(),
    desc: 'a simple REST server by node@express',
    text: '你好世界\n一个简单的API服务,基于nodejs express',
    logo: "https://img.icons8.com/dusk/64/000000/aquarium.png"
  });
});

module.exports = router;