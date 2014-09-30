var http = require('http');
var serveras = require('../');
var osenv = require('osenv');

serveras(80, function (err, fd) {
    var server = http.createServer(function (req, res) {
        res.write('user=' + osenv.user() + '\n');
        res.end('uid=' + process.getuid() + '\n');
    });
    server.listen(80);
});
