#!/bin/sh

LOCAL_IP=`/sbin/ifconfig |grep -v '127.0.0.1' |awk '/inet/{print $2}' | awk -F: '{print $2}'`

WORK_DIR=../scripts 

cd ${WORK_DIR}

TARGET="scan: "
result=`ps -ewf|grep "$TARGET"|grep -wv grep|grep -wv vi | grep -wv tail | grep -wv check_alive | grep -v "\.sh" | grep -v "/alarm " | wc -l `
echo $result
if [ "$result" -lt "1"  ]
then
	./svr.sh restart
    ./alarm.sh "Fatal: $LOCAL_IP $TARGET down"
	NOW_TIME=`date`
	echo "Fatal: $TARGET down $result $NOW_TIME" >> down.log
fi
