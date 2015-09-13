#!/bin/bash

<<COMMENT
@date: 2015-04-13
@description: 
COMMENT

dir_tools='/usr/local/avs/public_tools'
#path=$(readlink -f $0)
#dir=$(dirname $path); #当前脚本目录

#source $dir_tool/oneprocess.sh
#fun_runone $0; #保证只有一个进程

#ip_local=$($dir_tools/getprivateip.pl); #本地ip

function usage()
{
    echo
    echo "Usage: $0 [OPTION...] argv"
    echo "功能: "
    echo
    echo "OPTION"
    echo "  -h|--help                 help"
    echo "  -t|--test                 test"
    echo
}
while [ $# -gt 0 ]; do
    case "$1" in
        "--help" | "-h")
            usage; exit 0 ;;
        "--test" | "-t")
            shift; if [ $# -gt 0 ]; then test="$1"; fi ;;
        *)
            break;;
    esac
    shift;
done

<<COMMENT
#例子
if [ $# -ne 1 ]; then
    usage
    exit 0;
fi
COMMENT

server_name="ticket";
#1, local ip
file_conf="conf/$server_name.conf"; 
file_conf_template="$file_conf.template"
file_ini="html/test_php/config.ini"; 
file_ini_template="$file_ini.template"
file_query_ini="html/s/config.ini"; 
file_query_ini_template="$file_ini.template"
ip_local=$($dir_tools/getprivateip.pl )
#根据模板文件生成本地配置
#echo "$dir_tools/conf_par_replace.sh $file_conf_template  $file_conf";
$dir_tools/conf_par_replace.sh $file_conf_template  $file_conf > /dev/null
$dir_tools/conf_par_replace.sh $file_ini_template  $file_ini > /dev/null
$dir_tools/conf_par_replace.sh $file_query_ini_template  $file_query_ini > /dev/null


#修改alarm脚本
{
    echo "#!/bin/sh" 
    echo 'dir_tool="/usr/local/avs/public_tools/"' 
    echo "" 
} > scripts/alarm.sh

find scripts -name '*.sh' -o -name '*.pl' -o -name '*.py' | xargs chmod +x ;

#注意：需要放在最后面.个性化配置,将会根据配置文件修改本地的模板文件 
file_conf_person="conf/personalconf.conf"
if [ -e $file_conf_person ];then
    $dir_tools/conf_par_personalize.pl --noxml $file_conf_person > /dev/null
fi
file_conf_person="conf/personalconf_raw.conf"
if [ -e $file_conf_person ];then
    $dir_tools/conf_par_personalize.pl --raw $file_conf_person > /dev/null
fi


#php
yum -y install php-fpm.x86_64
#/etc/init.d/php-fpm restart
/usr/sbin/php-fpm -D
chmod +x /root /root/ticket_proj /root/ticket_proj/release /root/ticket_proj/release/ticket /root/ticket_proj/release/ticket/html
yum -y install php-mysql.x86_64

#mysql
#cp conf/mysql-5.6.repo /etc/yum.repos.d/;
yum -y install mysql-server.x86_64;
vim /etc/my.cnf;
#[mysqld]
#bind-address        = 127.0.0.1
mysql_install_db;
/etc/init.d/mysqld start;
#/usr/bin/mysqld_safe &
#chown -R mysql  log_dir data_dir
#/usr/bin/mysqladmin -u root password 'ase2004'

mkdir logs
