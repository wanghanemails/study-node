/**
 * Created by wanghan1 on 2016/4/19.
 */

var http = require('http');

http.createServer(function(req,res){
    //req 请求信息  在服务器端 看请求头等
    //res 请求响应  响应 请求 返回客户端内容
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.write('<p style="color: red;">hehe</p>');
    res.end('Hello world 说是\n');
}).listen(9527,"localhost");
    console.log("第一个服务器端程序 运行在 端口9527本地");