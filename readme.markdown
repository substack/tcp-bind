# tcp-bind

allocate a file descriptor to listen on a port later

This is handy if you want to run a server on a low port but want to drop
privileges as soon as possible.

[![build status](https://secure.travis-ci.org/substack/tcp-bind.png)](http://travis-ci.org/substack/tcp-bind)

# example

Here we allocate a file descriptor for tcp port 80 and then drop permissions
right away:

``` js
var http = require('http');
var alloc = require('tcp-bind');
var fd = alloc(80);

process.setgid(process.argv[3]);
process.setuid(process.argv[2]);

var server = http.createServer(function (req, res) {
    res.write('uid=' + process.getuid() + '\n');
    res.end('gid=' + process.getgid() + '\n');
});
server.listen({ fd: fd });
```

Now we're listening on port 80, but the rest is running under a regular user:

```
$ sudo node drop.js substack cdrom &
[1] 2855
$ curl localhost
uid=1000
gid=24
```

# methods

``` js
var alloc = require('tcp-bind')
```

## var fd = alloc(addr='0.0.0.0', port)

Allocate a file descriptor to listen on `port` at an ipv4 or ipv6 string address
`addr`.

You can create a tcp server from the file descriptor `fd` later by passing it to
the server's `.listen()` method:

```
server.listen({ fd: fd })
```

This method throws when the port is already bound and when the current user
doesn't have permission to open the port requested.

# install

With [npm](https://npmjs.org) do:

```
npm install tcp-bind
```

# license

MIT
