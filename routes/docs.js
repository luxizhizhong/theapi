// es6
const express = require('express'),
      router = express.Router()
/* GET home page. */
router.get('/docs', (req, res, next)=> {
  res.render('docs',{
    txt: new Date()
  })
});

module.exports = router;