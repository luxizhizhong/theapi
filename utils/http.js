// by @request
const request = require('request'),
      api = require('./api')

function Ajax(obj) {
  // encodeURL 编码中文,不然中文会报错
  request(encodeURI(obj.url),(err,res,body)=> {
    if (!err && res.statusCode == 200) {
      obj.success(body)
    } else {
      obj.err(err)
      console.error(err)
    }
  })
}

module.exports = {
  ajax: Ajax,
  hlxData: api.hlxData,
  hlxFloor: api.hlxFloor,
  hlxTools: api.hlxTools,
  errData: api.errData,
}