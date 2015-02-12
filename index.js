var TCP = process.binding('tcp_wrap').TCP;
var errno = require('util')._errnoException;

module.exports = function (addr, port) {
    if (typeof addr === 'number' || /^\d+$/.test(addr)) {
        var p = port;
        port = addr;
        addr = p;
    }
    if (!port) port = 0;
    if (!addr) addr = '0.0.0.0';
    var h = new TCP;
    var r = /:/.test(addr)
        ? h.bind6(addr, port)
        : h.bind(addr, port)
    ;
    if (r) {
        error(r, 'bind');
    }
    
    var sock = {};
    var s = h.getsockname && h.getsockname(sock);
    if (s || (port && port !== sock.port)) {
        error(s, 'EADDRINUSE');
    }
    else {
        return h.fd;
    }
};

function error (err, syscall) {
    var ex = errno(err, syscall);
    throw ex;
}
