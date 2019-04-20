const express = require('express'),
      router = express.Router();
router
  .get('/time',(req,res,next)=> {
    let b = {}, d = new Date(),
        c = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
        today = ` ${d.getFullYear()}年 \
                  ${d.getMonth() < 10 ? '0'+(d.getMonth()+1) : d.getMonth()}\
                  月${d.getDate()}日 ${c[d.getDay()]}`
    b = {
      timestamp: Date.now(),
      year: d.getFullYear(),
      month: d.getMonth()+1,
      today: today,
      day: c[d.getDay()],
      date: d.getDate()
    }
    res.send(JSON.stringify(b))
  })

module.exports = router