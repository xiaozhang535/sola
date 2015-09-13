#!/bin/bash

<<COMMENT
@author: ginozhang
@date: 2015-03-20
@description: 
COMMENT
mkdir ../release/ticket/sbin ../release/ticket/logs
export LUAJIT_INC=/usr/local/include/luajit-2.0;
export LUAJIT_LIB=/usr/local/lib/;
cd ../libsrc/LuaJIT-2.0.3/;make;make install; cd -;

yum -y install pcre-devel.x86_64;
yum -y install openssl-devel.x86_64;
#apt-get install libjson-c-dev;
#ln -T -s /usr/lib/x86_64-linux-gnu/libjson-c.a /usr/lib/libjson-c.a;
cd lua-resty-string; make install; cd -;
yum install autoconf;
yum install automake;
yum install libtool.x86_64;
cd ../libsrc/json-c-json-c-0.11-20130402/;./autogen.sh;./configure --prefix=/usr/;mv -f libtool libtool.bak;ln -s -T /usr/bin/libtool libtool;make; make install;cd -;
#cd ../libsrc/json-c-json-c-0.11-20130402/;mv libtool libtool.bak;ln -s -T /usr/bin/libtool libtool;./autogen.sh;./configure --prefix=/usr/;make; make install;cd -;
cd ../libsrc/LuaXML_101012/;make;cp LuaXML_lib.so /usr/local/lib/lua/5.1/;cp LuaXml.lua ~/ticket_proj/release/ticket/conf/;cd -;

exist=$(egrep '/usr/local/lib/' /etc/ld.so.conf);
if [ "$exist" == "" ];then 
    echo "/usr/local/lib/" >> /etc/ld.so.conf; 
    ldconfig;
fi;


#drizzle: http://openresty.org/#DrizzleNginxModule #./configure --without-server --enable-static
#json: json-c-json-c-0.11-20130402: ./configure --prefix=/usr/ ;make;make install
#pcre: ./configure --with-pcre=/data/home/ginozhang/dev-soft/pcre-8.30
#./Configure --with-debug --add-module=drizzle-nginx-module --add-module=rds-json-nginx-module --add-module=ngx_devel_kit --add-module=lua-nginx-module --add-module=headers-more-nginx-module --with-cc-opt=-DDDEBUG=1 --with-cc-opt='-g -O0'  --prefix=/data/menshen/scan 
#./Configure --with-debug --add-module=drizzle-nginx-module --add-module=rds-json-nginx-module --add-module=ngx_devel_kit --add-module=lua-nginx-module --with-cc-opt=-DDDEBUG=1 --with-cc-opt='-g -O0'  --prefix=/root/server/ticket/ --with-http_ssl_module --with-openssl=./openssl
#--add-module=encrypted-session-nginx-module
./Configure --with-debug --add-module=rds-json-nginx-module --add-module=ngx_devel_kit --add-module=lua-nginx-module --with-cc-opt=-DDDEBUG=1 --with-cc-opt='-g -O0'  --prefix=/root/ticket_proj/release/ticket/ --with-http_ssl_module
