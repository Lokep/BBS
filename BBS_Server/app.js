const express = require('express');
const path = require('path');

//由服务端提供一个favicon
const favicon = require('serve-favicon');
// 一个node.js关于http请求的日志中间件
// 每次http请求，express实例都会输出日志，并且使用一致的格式
const logger = require('morgan');
// cookieParser是对http传入的cookie进行解析后赋值给req.cookies，使得中间件可用
const cookieParser = require('cookie-parser');
// bodyParser作用是对post请求的请求体进行解析
const bodyParser = require('body-parser');


const app = express();


//express.static 中间件函数会根据目录的添加顺序查找所需的文件
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


module.exports = app