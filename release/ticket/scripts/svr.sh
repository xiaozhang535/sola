#!/bin/bash

SVR="ticket"
CONF="ticket.conf"

function Start()
{
    ulimit -n 10240;
    ulimit -c unlimited;
    ../sbin/$SVR -c conf/$CONF  &
}

function Stop()
{
        killall -9 $SVR; 
}
ulimit -c unlimited

if test "$1" == "start"; then
        Start
elif test "$1" == "stop"; then
        Stop
elif test "$1" == "restart"; then
        Stop
        sleep 2; #for: 进程内部通信socket
        Start
else
        echo "Usage:"
        echo "  $0 start | stop | restart"
fi
