var net = require('net');
var test = require('tape');
var alloc = require('../');
var concat = require('concat-stream');

test('double bind', function (t) {
    t.plan(1);
    
    var port = 10000 + Math.floor(Math.random() * 55536);
    alloc(port);
    t.throws(function () {
        alloc(port);
    });
});
