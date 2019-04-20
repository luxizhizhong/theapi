const express = require('express'),
      router = express.Router(),
      utils = require('../utils/http'),
      err = utils.errData,
      hlxData = utils.hlxData,
      hlxTools = utils.hlxTools,
      hlxFloor = utils.hlxFloor
router
  .get('/floor', (req, res, next)=> {
    let q = req.query,
        t = q.type || "",
        r = res,
        a = 'category',
        b = 'hot_post'
    {
      if (t == a || t == b) {
        utils.ajax({
          url: `${hlxFloor}/category/list/ANDROID/2.0${hlxData}`,
          success: data => {
            data = JSON.parse(data)
            if (t == a) {
              r.send(JSON.stringify(data.categories))
            } else if (t == b) {
              r.send(JSON.stringify(data.postInfo))
            }
          },
          err: () => r.send(err)
        })
      }
      if (q['cat_id']) {
        let id = q['cat_id']
        utils.ajax({
          url: `${hlxFloor}/post/list/ANDROID/2.1${hlxData}&cat_id=${id}`,
          success: data => r.send(data),
          err: () => r.send(err)
        })
      }
      if (q['post_id']) {
        let id = q['post_id']
        utils.ajax({
          url: `${hlxFloor}/post/detail/ANDROID/2.3${hlxData}&post_id=${id}`,
          success: data => r.send(data),
          err: () => r.send(err)
        })
      }
    }
  })
  .get('/tools', (req, res, next)=> {
    let q = req.query,
        t = q.type || "",
        r = res
      {
        if (t == 'search') {
          // 搜索建议
          if (q.keys == 'suggest') {
            utils.ajax({
              url: `${hlxTools}/search/suggest/ANDROID/3.6${hlxData}`,
              success: data => r.send(data),
              err: () => r.send(err)
            })
          } else if (q.keys == 'recommend') {
            // 游戏(应用)搜索建议
            utils.ajax({
              url: `${hlxTools}/search/recommend/list/ANDROID/3.6${hlxData}`,
              success: data => r.send(data),
              err: () => r.send(err)
            })
          }
          if (q.keyword) {
            utils.ajax({
              url: `${hlxTools}/game/search/ANDROID/1.1?keyword=${q.keyword}`,
              success: data => r.send(data),
              err: () => r.send(err)
            })
          }
        } else if (t == 'game') {
          let msg = '请传入一个 app_id',
              id = q['app_id']
          // 首页游戏    
          if (q.keys == 'recommend') {
            utils.ajax({
              url: `${hlxTools}/bbs/recommend/ANDROID/3.6${hlxData}`,
              success: data => r.send(data),
              err: () => r.send(err)
            })
          } else if (q.keys == 'detail') {
            // 游戏详情,必须传入一个 app_id
            if (id) {
              utils.ajax({
                url: `${hlxTools}/game/detail/ANDROID/3.6${hlxData}&app_id=${id}`,
                success: data => r.send(data),
                err: () => r.send(err)
              })
            } else {
              r.send(msg)
            }
          } else if (q.keys == 'comment') {
            // 游戏评论 必须传 app_id
            if (id) {
              utils.ajax({
                url: `${hlxTools}/game/comment/good/list/ANDROID/3.6${hlxData}&app_id=${id}`,
                success: data => r.send(data),
                err: () => r.send(mes)
              })
            } else {
              r.send(msg)
            }
          }
          
        }
      }
  })
module.exports = router;