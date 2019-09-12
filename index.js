exports.indexFile = function (request, response) {
    var url = require('url');
    var fs = require('fs');
    var uc = require('upper-case');
    fs.readFile('index.html', function (error, data) {

        if (error) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            return response.end("<h1 class='text-center'>No Class List!</h1>");
        }
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(data);
        response.end();
    });
}; 