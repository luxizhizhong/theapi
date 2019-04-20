// es6
const express = require('express'),
      router = express.Router(),
      fs = require('fs')
/* GET home page. */
router.get('/docs', (req, res, next)=> {
  res.render('docs',{
    txt: new Date()
  })
});

module.exports = router;