const readline = require('readline'),
      fs = require('fs'),
      path = require('path')
let data = [],CDN = ['https://ww3.sinaimg.cn/large'],
    filesURL = `${path.resolve(__dirname,'..')}/public/files/sinetxt.txt`
let rl = readline.createInterface({
      input: fs.createReadStream(filesURL),
      crlfDelay: Infinity
    });
rl.on('line', line => {
  data.push(`${CDN[0]}/${line}`)
});
module.exports = data