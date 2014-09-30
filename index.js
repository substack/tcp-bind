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
        var ex = new Error('bind ' + process._errno);
        ex.errno = ex.code = process._errno;
        ex.syscall = 'bind';
        throw ex;
    }
    else {
        return h.fd;
    }
};
