// api list
let huluxiaFloor = `http://floor.huluxia.com`,
    huluxiaTools = `http://tools.huluxia.com`,
    errData = JSON.stringify({
      msg: '接口错误',
      code: -200
    }),
    huluxiaData = {
      platform: 2,
      gkey: 440000,
      app_version: '3.5.0.88.3',
      versioncode:20141400,
      market_id: 'floor_web'
    }
// 合并 data
{
  let result = '?'
  for (let i in huluxiaData) {
    result += `${i}=${huluxiaData[i]}&`
  }
  huluxiaData = result.slice(0,result.length-1)
}

module.exports = {
  hlxFloor: huluxiaFloor,
  hlxTools: huluxiaTools,
  errData: errData,
  hlxData: huluxiaData
}