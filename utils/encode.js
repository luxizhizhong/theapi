const url = require('url')

function format(str) {
  let result = url.parse(str).path
  result = result.replace(/\/s\//g,'')
  result = result.replace(/_/g,'')
  result = result.replace(/-/g,'')
  // return `?uuids=BDY-${result}&client_version=2019.1`
  return `https://ypsuperkey.meek.com.cn/api/v1/items/BDY-${result}?client_version=2019.1`
}

module.exports = format