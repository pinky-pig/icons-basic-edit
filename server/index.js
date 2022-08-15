
// 启动调试 node --inspect server.js
// chrome://inspect 
var express = require('express')
var app = express()

const SVG_API = require('./svg/index.js')

// axios接口数据。axios数据请求方式x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// debugger方法：打开浏览器，打开控制台，点击左下角的node标志，地址栏输入接口地址，即可进入断点

//设置跨域访问
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})

app.use('/form', SVG_API)

app.listen(3200, () => {
  console.log('express start port 3200');
})

