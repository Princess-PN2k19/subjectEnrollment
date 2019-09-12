var http = require("http");
var add = require("./addFile.js");
var index = require("./index.js");
var view = require("./view.js");
var url = require('url');

http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    var sp = path.split("/");
    var between = sp[1];
    console.log("Working...");
    switch (between) {
        case '':
            console.log(between);
            index.indexFile(req, res);
            break;
        case 'enroll':
            add.addFile(req, res);
            break;
        case 'class':
            console.log(between);
            view.view(req, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1 class='text-center'>Not found!</h1>");
            break;
    }
}).listen(8082);