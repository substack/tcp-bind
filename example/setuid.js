var http = require('http');
var alloc = require('../');
var fd = alloc(80);

process.setgid(process.argv[3]);
process.setuid(process.argv[2]);

var server = http.createServer(function (req, res) {
    res.write('uid=' + process.getuid() + '\n');
    res.end('gid=' + process.getgid() + '\n');
});
server.listen({ fd: fd });
