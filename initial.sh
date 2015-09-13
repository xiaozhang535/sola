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
mkdir ticket_proj;cd ticket_proj;
git init;
#git remote add origin https://github.com/gogofly/sola.git;
git remote add origin https://github.com/xiaozhang535/sola.git;
#git config --global user.email "ginozhang@vip.qq.com"
git config user.name xiaozhang535
git config user.email hqzhang1983@gmail.com
git pull -u origin master;
#403: vim .git/config; url = https://gogofly@github.com/gogofly/sola.git

#common
#mkdir /usr/local/avs;cp public_tools.tgz /usr/local/avs/;
#cd /usr/local/avs/;tar -zxvf public_tools.tgz;cd -;
mkdir /usr/local/avs/public_tools/;cd /usr/local/avs/public_tools/;
git init;
git remote add origin https://github.com/xiaozhang535/public_tools.git;
#git clone https://github.com/xiaozhang535/public_tools.git public_tools/
git config user.name xiaozhang535
git config user.email hqzhang1983@gmail.com
git pull -u origin master;
cd -;

#lib
yum -y install lrzsz
yum -y install autoconf.noarch
yum -y install automake.noarch
yum -y install libtool.x86_64
