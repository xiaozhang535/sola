#!/bin/bash

<<COMMENT
@author: ginozhang
@date: 2015-08-05
@description: 
COMMENT
yum -y install gcc;
yum -y install git;
yum -y install vim;
yum -y install ctags;
yum -y install cscope;
cd /usr/local/bin/;ln -s -T /usr/bin/cscope cscope;cd -;

#ticket
cd /root/
mkdir ticket_src;cd ticket_src;
git init;
git remote add origin https://github.com/gogofly/sola.git;
git config --global user.email "ginozhang@vip.qq.com"
git pull -u origin master;
#403: vim .git/config; url = https://gogofly@github.com/gogofly/sola.git

#common
mkdir /usr/local/avs;cp public_tools.tgz /usr/local/avs/;
cd /usr/local/avs/;tar -zxvf public_tools.tgz;cd -;

#lib
yum -y install lrzsz
yum -y install autoconf.noarch
yum -y install automake.noarch
yum -y install libtool.x86_64
