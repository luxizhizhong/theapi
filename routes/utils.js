const express = require('express'),
      router = express.Router(),
      ajax = require('../utils/http').ajax,
      request = require('request')
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
  .get('/nem/:type',(req,res,next)=> {
    const nw = new (require('simple-netease-cloud-music'))
    let p = req.params,
        r = res,
        t = p.type,
        q = req.query,
        msg = `请传入一个 id`
    if (t == 'dl') {
      if (q.id) {
        r.redirect(302,`http://music.163.com/song/media/outer/url?id=${q.id}.mp3`)
      } else r.send()
    } else if (t == 'search') {
      let k = q.keywords
      if (k) {
        nw.search(k).then(d=> r.send(d))
      } else r.send(msg.replace('id','keywords'))
    } else if (t == 'playlist') {
      let e = q.id
      if (e) {
        nw.playlist(e).then(d=> r.send(d))
      } else r.send(msg)
    } else if (t == 'lyric') {
      let l = q.lyric
      if (l) {
        nw.lyric(l).then(d=> r.send(d))
      } else r.send(msg)
    } else if (t == 'song') {
      let s = q.song
      if (s) {
        nw.song(s).then(d=> r.send(d))
      } else r.send(msg)
    }
  })
  .get('/txt/:txt',(req,res,next)=> {
    const diy = require('../utils/line')
    let txt = req.params.txt,
        r = res
    if (txt) {
      r.send(txt)
    } else {
      r.send('请传入文本值')
    }
  })
  .get('/md',(req,res,next)=> {
    let url = req.query.url,
        msg = '请传递 url',
        r = res
    if (url) {
      request(url,(err,res,body)=> {
        if (!err && res.statusCode == 200) {
          r.render('markdown',{
            text: body
          })
        }
      })
    } else {
      r.send(msg)
    }
  })
  .get('/bing',(req,res,next)=> {
    let q = req.query
      ajax({
        url: `http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1`,
        success: data=> {
            data = JSON.parse(data).images[0]
            let d = {
              date: data.startdate,
              url: `https://cn.bing.com/${data.url}`
            }
            if (q.type == 'img') {
              res.redirect(302,d.url)
            }else {
              res.send(JSON.stringify(d))
            }        
        },
        err: ()=> res.send('接口有问题或者服务器出错')
     })
  })
  .get('/mm',(req,res,next)=> {
    let q = req.query.v,
        c = req.query.count
    if (q == '1') {
      res.redirect(302,`https://yantuz.cn/mmPic/index.php`)
    } else if (q == '2') {
      res.redirect(302,`https://api.isoyu.com/mm_images.php`)
    } else if (q == '3') {
      let random = ()=> Math.floor(Math.random() * (diy.length - 1))
      if (isNaN(c)) {
        res.send(JSON.stringify(diy)) 
      } else {
        let arr = []
        for (let index = 0; index < c; index++) {
          let r = random()
          arr.push(diy[r])
        }
        res.send(JSON.stringify(arr))
      }
    }
  })
  .get('/qq',(req,res,next)=> {
    let q = req.query.number
    if (q) {
      res.redirect(302,`http://qlogo2.store.qq.com/qzone/${q}/${q}/100`)
    } else res.send('请传递 number 参数')
  })
  .get('/pan',(req,res,next)=> {
    let u = req.query.url,
        v = req.query.v,
        r = res
    if (v == '1') {
      ajax({
        url: `https://node.pnote.net/public/pan?url=${u}`,
        success: data=> r.send(data),
        err: ()=> req.send('返回失败')
      })
    // 接口可能不可用!
    } else if (v == '2'){
      const p = (require('../utils/encode'))(u)
      console.log(p)
      request.post(p,(err,res,body)=> {
        if (!err && res.statusCode == 200) {
          r.send(body)
        }
      })
    }
  })
  .get('/show',(req,res,next)=> {
    let v = req.query.v,r=res
    switch (v) {
      case '1':
        ajax({
          url: `https://api.comments.hk`,
          success: d=> r.send(d),
          err: e=> r.send('null')
        })
        break;
      case '2':
        ajax({
          url: `https://v1.hitokoto.cn`,
          success: d=> r.send(d),
          err: e=> r.send('null')
        })
        break;
      case '3':
        ajax({
          url: `https://v2.jinrishici.com/one.json`,
          success: d=> r.send(d),
          err: e=> r.send('null')
        })
        break;
      default:
        r.send('请传递1,2')
    }
  })
router.get('/',(req,res,next)=> {
  res.send(`<pre>
    ♐️ 工具系列,致力于提高效率

    Usage: 
      /                    显示帮助
      /time                显示时间
      /nem                 网易云接口
      -------
        /search?keywords=&   搜索,传递一个关键字
        /dl?id=&             音乐地址,为了保护版权,收费音乐不调用(直接返回真实地址)
        /playlist?id=&       歌单,传入一个id
        /lyric?id=&          歌词,需要传递一个id
        /song?id=7           歌曲详情,需要传递一个id
      -------
      /txt/:txt            传递文字,并会返回文本,在某些需求里会有
      /md?url=&            在线预览 markdown 请传递一个url参数
      /bing[?type=img]     将会返回 bing 美图,若传递type=img参数,将会直接302跳转图片
      /mm?v=&count=&       返回妹子图
        v=1     妹子图(直接返回图片地址,img可直接调用)
        v=2     也是妹子图(同上)
        v=3     也是妹子图,不过是动漫(json数据)
          count 返回数量,最多传递100个,最少传递5个
      /qq                  302返回QQ头像,需要传递number=qq
      /pan                 查询百度云盘提取密码
        v=1     稳定接口
        v=2     不稳定接口
      /show                一句话,装逼必备
        v=1     网易云热评
        v=2     一言骚话
        v=3     古诗,装逼必备
  </pre>`)
})
module.exports = router