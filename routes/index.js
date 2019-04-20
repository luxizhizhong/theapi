const express = require('express'),
      router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', {
    title: '〰️ luxi-api 〰️',
    date: new Date(),
    desc: 'a simple REST server by node@express',
    text: '一个简单的API服务,基于Nodejs@Express',
    logo: "https://img.icons8.com/dusk/64/000000/aquarium.png"
  });
});

module.exports = router;