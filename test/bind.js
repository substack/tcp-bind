var net = require('net');
var test = require('tape');
var alloc = require('../');
var concat = require('concat-stream');

test('bind', function (t) {
    t.plan(1);
    t.once('end', function () { server.close() });
    
    var port = 10000 + Math.floor(Math.random() * 55536);
    var fd = alloc(port);
    
    var server = net.createServer(function (stream) {
        stream.end('beep boop\n');
    });
    server.listen({ fd: fd }, function () {
        net.connect(port).pipe(concat(function (body) {
            t.equal(body.toString('utf8'), 'beep boop\n');
        }));
    });
});
