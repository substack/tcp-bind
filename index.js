var TCP = process.binding('tcp_wrap').TCP;

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
        ? h.bind(addr, port)
        : h.bind6(addr, port)
    ;
    if (r) {
        error('bind', process._errno);
    }
    
    var sock = h.getsockname && h.getsockname();
    if (!sock || (port && port !== sock.port)) {
        error('bind', 'EADDRINUSE');
    }
    else {
        return h.fd;
    }
};

function error (syscall, errno) {
    var ex = new Error(syscall + ' ' + errno);
    ex.errno = ex.code = errno;
    ex.syscall = syscall;
    throw ex;
}
