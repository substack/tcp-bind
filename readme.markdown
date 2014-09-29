# server-as

open some file descriptors then drop down to another user
with setuid and setgid

This is handy if you want to run a server on low ports (`< 1024`) but don't want
to run the service with root privileges.

