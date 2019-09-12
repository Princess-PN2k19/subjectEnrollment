exports.view = function (req, res) {
    var url = require('url');
    var fs = require('fs');
    var uc = require('upper-case');
    var path = url.parse(req.url).pathname;
    var sp = path.split("/");
    var between = sp[1];
    var filename = sp[sp.length - 1] + ".csv";
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1 class='text-center'>No Class List!</h1>");
        }
        var info = "<tbody>";
        var content = "</tbody></table></body></html>";
        var table = "<html><head>" +
            "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>" +
            "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
            "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>" +
            "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>" +
            "<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'>" +
            "<style>table {border-collapse: collapse;border-spacing: 0;width: 100%;border: 1px solid #ddd;}" +
            "th, td {text-align: left;padding: 16px;}" +
            "tr:nth-child(even) {background-color: #f2f2f2}</style>" +
            "<title>" + uc(sp[2]) + "</title></head><body style='font-style: 'Comfortaa''><div class='jumbotron text-center'>" +
            "<h1 class='text-center'>" + uc(sp[2]) + "</h1><br>" +
            "<table class='table'><tr scope='row' style='background: #26548c; color: white'><thead class='thead-dark'><td scope='col'><b>Name</b></td>" +
            "<td scope='col'><b>Email</b></td><td scope='col'><b>Course</b></td></tr></thead></div></body>" +
            "<script>$(document).ready(function(){" +
            "$('.table tr:last').remove();" +
            "})</script>";

        var a = data.split('\n').join(',');
        var b = a.split(',');
        var counter = 0;
        for (var i = 0; i < b.length / 3; ++i) {
            info += "<tr><td>" + b[counter] + "</td><td>" + b[counter + 1] + "</td><td>" + b[counter + 2] + "</td></tr>";
            counter += 3;
        }
        table += info + content;

        console.log(uc(sp[2]) + " table is displayed!");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(table);
        return res.end();
    });
}