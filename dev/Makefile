
default:	build
clean:
	rm -rf objs

build:
	$(MAKE) -f objs/Makefile
	$(MAKE) -f objs/Makefile manpage

install:
	$(MAKE) -f objs/Makefile install

upgrade:
	/root/ticket_proj/release/ticket//sbin/ticket -t

	kill -USR2 `cat /root/ticket_proj/release/ticket//logs/nginx.pid`
	sleep 1
	test -f /root/ticket_proj/release/ticket//logs/nginx.pid.oldbin

	kill -QUIT `cat /root/ticket_proj/release/ticket//logs/nginx.pid.oldbin`
