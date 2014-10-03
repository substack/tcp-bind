var net = require('net');
var test = require('tape');
var alloc = require('../');
var concat = require('concat-stream');

test('double bind', function (t) {
    t.plan(1);
    t.once('end', function () { server.close() });
    
    var server = net.createServer(function (stream) {
        stream.end('server0');
    });
    server.listen(0, function () {
        t.throws(function () {
            alloc(server.address().port);
        });
    });
});
